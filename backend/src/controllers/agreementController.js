const db = require("../database/connection");

const {
    generateAgreementHash
} = require("../services/agreementHashService");


// =====================================================
// CREATE AGREEMENT
// POST /api/agreements
// =====================================================
const createAgreement = async (req, res) => {
    let connection;

    try {
        const {
            groupId,
            propertyId,
            totalRent,
            startDate,
            endDate,
            members
        } = req.body;

        // Only landlords can create agreements
        if (req.user.role !== "landlord") {
            return res.status(403).json({
                message: "Only landlords can create agreements"
            });
        }

        // Validate required fields
        if (
            !groupId ||
            !propertyId ||
            totalRent === undefined ||
            !startDate ||
            !endDate ||
            !Array.isArray(members) ||
            members.length === 0
        ) {
            return res.status(400).json({
                message:
                    "groupId, propertyId, totalRent, startDate, endDate and members are required"
            });
        }

        // Check property
        const [properties] = await db.query(
            `SELECT id, landlord_id
             FROM properties
             WHERE id = ?`,
            [propertyId]
        );

        if (properties.length === 0) {
            return res.status(404).json({
                message: "Property not found"
            });
        }

        // Check property ownership
        if (
            Number(properties[0].landlord_id) !==
            Number(req.user.id)
        ) {
            return res.status(403).json({
                message: "You do not own this property"
            });
        }

        // Check group
        const [groups] = await db.query(
            `SELECT id, property_id, status
             FROM rental_groups
             WHERE id = ?`,
            [groupId]
        );

        if (groups.length === 0) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        const group = groups[0];

        // Group must be connected to property
        if (
            Number(group.property_id) !==
            Number(propertyId)
        ) {
            return res.status(400).json({
                message:
                    "This group is not connected to this property"
            });
        }

        // Get accepted group members
        const [groupMembers] = await db.query(
            `SELECT student_id
             FROM group_members
             WHERE group_id = ?
             AND status = 'accepted'`,
            [groupId]
        );

        if (groupMembers.length === 0) {
            return res.status(400).json({
                message: "Group has no accepted members"
            });
        }

        const acceptedStudentIds = groupMembers.map(
            member => Number(member.student_id)
        );

        // Validate agreement members
        for (const member of members) {

            if (
                !member.studentId ||
                member.rentShare === undefined
            ) {
                return res.status(400).json({
                    message:
                        "Each member needs studentId and rentShare"
                });
            }

            if (
                !acceptedStudentIds.includes(
                    Number(member.studentId)
                )
            ) {
                return res.status(400).json({
                    message:
                        `Student ${member.studentId} is not an accepted member of this group`
                });
            }

            if (Number(member.rentShare) <= 0) {
                return res.status(400).json({
                    message:
                        "rentShare must be greater than 0"
                });
            }
        }

        // Check total rent shares
        const totalShares = members.reduce(
            (sum, member) =>
                sum + Number(member.rentShare),
            0
        );

        if (
            Math.abs(
                totalShares - Number(totalRent)
            ) > 0.01
        ) {
            return res.status(400).json({
                message:
                    "Rent shares must equal total rent"
            });
        }

        // Get next agreement version
        const [versions] = await db.query(
            `SELECT MAX(version) AS maxVersion
             FROM agreements
             WHERE group_id = ?`,
            [groupId]
        );

        const version =
            (versions[0].maxVersion || 0) + 1;

        // Prepare agreement data for hashing
        const agreementData = {
            groupId: Number(groupId),
            propertyId: Number(propertyId),
            landlordId: Number(req.user.id),
            totalRent: Number(totalRent),
            startDate,
            endDate,
            members: members.map(member => ({
                studentId: Number(member.studentId),
                rentShare: Number(member.rentShare)
            }))
        };

        // Generate SHA-256 hash
        const documentHash =
            generateAgreementHash(agreementData);

        // Start database transaction
        connection = await db.getConnection();

        await connection.beginTransaction();

        // Create agreement
        const [result] = await connection.query(
            `INSERT INTO agreements
            (
                group_id,
                property_id,
                landlord_id,
                total_rent,
                start_date,
                end_date,
                version,
                document_hash,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'draft')`,
            [
                groupId,
                propertyId,
                req.user.id,
                totalRent,
                startDate,
                endDate,
                version,
                documentHash
            ]
        );

        const agreementId = result.insertId;

        // Add agreement members
        for (const member of members) {

            await connection.query(
                `INSERT INTO agreement_members
                (
                    agreement_id,
                    student_id,
                    rent_share
                )
                VALUES (?, ?, ?)`,
                [
                    agreementId,
                    member.studentId,
                    member.rentShare
                ]
            );
        }

        await connection.commit();

        return res.status(201).json({
            message:
                "Rental agreement created successfully",
            agreementId,
            version,
            documentHash,
            status: "draft"
        });

    } catch (error) {

        if (connection) {
            await connection.rollback();
        }

        console.error(
            "Create agreement error:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });

    } finally {

        if (connection) {
            connection.release();
        }
    }
};


// =====================================================
// GET ALL AGREEMENTS
// GET /api/agreements
// =====================================================
const getAgreements = async (req, res) => {

    try {

        let agreements;

        // LANDLORD
        if (req.user.role === "landlord") {

            [agreements] = await db.query(
                `SELECT
                    a.id,
                    a.group_id,
                    a.property_id,
                    a.landlord_id,
                    a.total_rent,
                    a.start_date,
                    a.end_date,
                    a.version,
                    a.document_hash,
                    a.hedera_token_id,
                    a.hedera_transaction_id,
                    a.status,
                    a.created_at,
                    p.title AS property_title
                 FROM agreements a
                 JOIN properties p
                    ON a.property_id = p.id
                 WHERE a.landlord_id = ?
                 ORDER BY a.created_at DESC`,
                [req.user.id]
            );

        } else {

            // STUDENT
            [agreements] = await db.query(
                `SELECT DISTINCT
                    a.id,
                    a.group_id,
                    a.property_id,
                    a.landlord_id,
                    a.total_rent,
                    a.start_date,
                    a.end_date,
                    a.version,
                    a.document_hash,
                    a.hedera_token_id,
                    a.hedera_transaction_id,
                    a.status,
                    a.created_at,
                    p.title AS property_title
                 FROM agreements a
                 JOIN properties p
                    ON a.property_id = p.id
                 JOIN agreement_members am
                    ON a.id = am.agreement_id
                 WHERE am.student_id = ?
                 ORDER BY a.created_at DESC`,
                [req.user.id]
            );
        }

        return res.json(agreements);

    } catch (error) {

        console.error(
            "Get agreements error:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });
    }
};


// =====================================================
// GET ONE AGREEMENT
// GET /api/agreements/:id
// =====================================================
const getAgreement = async (req, res) => {

    try {

        const { id } = req.params;

        // Get agreement
        const [agreements] = await db.query(
            `SELECT
                a.id,
                a.group_id,
                a.property_id,
                a.landlord_id,
                a.total_rent,
                a.start_date,
                a.end_date,
                a.version,
                a.document_hash,
                a.hedera_token_id,
                a.hedera_transaction_id,
                a.status,
                a.created_at,
                p.title AS property_title
             FROM agreements a
             JOIN properties p
                ON a.property_id = p.id
             WHERE a.id = ?`,
            [id]
        );

        if (agreements.length === 0) {
            return res.status(404).json({
                message: "Agreement not found"
            });
        }

        const agreement = agreements[0];

        // Security check
        if (req.user.role === "landlord") {

            if (
                Number(agreement.landlord_id) !==
                Number(req.user.id)
            ) {
                return res.status(403).json({
                    message:
                        "You do not have access to this agreement"
                });
            }

        } else {

            const [membership] = await db.query(
                `SELECT id
                 FROM agreement_members
                 WHERE agreement_id = ?
                 AND student_id = ?`,
                [id, req.user.id]
            );

            if (membership.length === 0) {
                return res.status(403).json({
                    message:
                        "You are not a member of this agreement"
                });
            }
        }

        // Get agreement members
        const [members] = await db.query(
            `SELECT
                am.student_id,
                u.name,
                u.email,
                am.rent_share,
                am.acceptance_status,
                am.accepted_at
             FROM agreement_members am
             JOIN users u
                ON am.student_id = u.id
             WHERE am.agreement_id = ?
             ORDER BY am.student_id`,
            [id]
        );

        return res.json({
            ...agreement,
            members
        });

    } catch (error) {

        console.error(
            "Get agreement error:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });
    }
};


// =====================================================
// ACCEPT AGREEMENT
// POST /api/agreements/:id/accept
// =====================================================
const acceptAgreement = async (req, res) => {

    let connection;

    try {

        const { id } = req.params;

        // Only students can accept
        if (req.user.role !== "student") {
            return res.status(403).json({
                message:
                    "Only students can accept agreements"
            });
        }

        // Check that student belongs to agreement
        const [members] = await db.query(
            `SELECT
                id,
                acceptance_status
             FROM agreement_members
             WHERE agreement_id = ?
             AND student_id = ?`,
            [
                id,
                req.user.id
            ]
        );

        if (members.length === 0) {
            return res.status(403).json({
                message:
                    "You are not a member of this agreement"
            });
        }

        // Already accepted
        if (
            members[0].acceptance_status ===
            "accepted"
        ) {
            return res.status(409).json({
                message:
                    "You have already accepted this agreement"
            });
        }

        // Check agreement
        const [agreements] = await db.query(
            `SELECT
                id,
                status
             FROM agreements
             WHERE id = ?`,
            [id]
        );

        if (agreements.length === 0) {
            return res.status(404).json({
                message:
                    "Agreement not found"
            });
        }

        const agreement = agreements[0];

        // Agreement must be draft
        if (agreement.status !== "draft") {
            return res.status(409).json({
                message:
                    "This agreement is no longer awaiting acceptance"
            });
        }

        // Start transaction
        connection = await db.getConnection();

        await connection.beginTransaction();

        // Accept current student
        await connection.query(
            `UPDATE agreement_members
             SET
                acceptance_status = 'accepted',
                accepted_at = CURRENT_TIMESTAMP
             WHERE agreement_id = ?
             AND student_id = ?`,
            [
                id,
                req.user.id
            ]
        );

        // Check pending members
        const [pendingMembers] =
            await connection.query(
                `SELECT COUNT(*) AS count
                 FROM agreement_members
                 WHERE agreement_id = ?
                 AND acceptance_status = 'pending'`,
                [id]
            );

        let newStatus = "draft";

        // Everyone accepted
        if (
            Number(pendingMembers[0].count) === 0
        ) {

            newStatus = "accepted";

            await connection.query(
                `UPDATE agreements
                 SET status = 'accepted'
                 WHERE id = ?`,
                [id]
            );
        }

        await connection.commit();

        return res.json({
            message:
                "Agreement accepted successfully",
            agreementId: Number(id),
            status: newStatus
        });

    } catch (error) {

        if (connection) {
            await connection.rollback();
        }

        console.error(
            "Accept agreement error:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });

    } finally {

        if (connection) {
            connection.release();
        }
    }
};


// =====================================================
// EXPORT CONTROLLERS
// =====================================================
module.exports = {
    createAgreement,
    getAgreements,
    getAgreement,
    acceptAgreement
};