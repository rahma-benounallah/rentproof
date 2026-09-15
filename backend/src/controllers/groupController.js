const db = require("../database/connection");

// ==========================================
// CREATE GROUP
// POST /api/groups
// ==========================================
const createGroup = async (req, res) => {
    try {
        // Only students can create roommate groups
        if (req.user.role !== "student") {
            return res.status(403).json({
                message: "Only students can create groups"
            });
        }

        // Check if the student is already in an active group
        const [existingGroups] = await db.query(
            `SELECT rg.id
             FROM rental_groups rg
             JOIN group_members gm
                ON rg.id = gm.group_id
             WHERE gm.student_id = ?
             AND gm.status = 'accepted'
             AND rg.status != 'closed'`,
            [req.user.id]
        );

        if (existingGroups.length > 0) {
            return res.status(409).json({
                message: "You are already in an active group"
            });
        }

        // Create the group
        const [result] = await db.query(
            `INSERT INTO rental_groups (created_by)
             VALUES (?)`,
            [req.user.id]
        );

        const groupId = result.insertId;

        // Add creator automatically as accepted member
        await db.query(
            `INSERT INTO group_members
             (group_id, student_id, status)
             VALUES (?, ?, 'accepted')`,
            [groupId, req.user.id]
        );

        res.status(201).json({
            message: "Group created successfully",
            groupId: groupId
        });

    } catch (error) {
        console.error("Create group error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// GET GROUP
// GET /api/groups/:id
// ==========================================
const getGroup = async (req, res) => {
    try {
        const { id } = req.params;

        // Get group information
        const [groups] = await db.query(
            `SELECT
                rg.id,
                rg.status,
                rg.property_id,
                rg.created_by,
                u.name AS creator_name
             FROM rental_groups rg
             JOIN users u
                ON rg.created_by = u.id
             WHERE rg.id = ?`,
            [id]
        );

        if (groups.length === 0) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        // Get group members
        const [members] = await db.query(
            `SELECT
                gm.id,
                gm.student_id,
                u.name,
                u.email,
                gm.status,
                gm.joined_at
             FROM group_members gm
             JOIN users u
                ON gm.student_id = u.id
             WHERE gm.group_id = ?`,
            [id]
        );

        res.json({
            ...groups[0],
            members: members
        });

    } catch (error) {
        console.error("Get group error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// INVITE STUDENT
// POST /api/groups/:id/invite
// ==========================================
const inviteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { studentId } = req.body;

        // Only students can invite
        if (req.user.role !== "student") {
            return res.status(403).json({
                message: "Only students can invite members"
            });
        }

        // Check studentId
        if (!studentId) {
            return res.status(400).json({
                message: "studentId is required"
            });
        }

        // Cannot invite yourself
        if (Number(studentId) === Number(req.user.id)) {
            return res.status(400).json({
                message: "You cannot invite yourself"
            });
        }

        // Check group
        const [groups] = await db.query(
            `SELECT *
             FROM rental_groups
             WHERE id = ?`,
            [id]
        );

        if (groups.length === 0) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        const group = groups[0];

        // Only creator can invite
        if (Number(group.created_by) !== Number(req.user.id)) {
            return res.status(403).json({
                message: "Only the group creator can invite members"
            });
        }

        // Check whether invited user exists and is a student
        const [students] = await db.query(
            `SELECT id
             FROM users
             WHERE id = ?
             AND role = 'student'`,
            [studentId]
        );

        if (students.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        // Check if already in this group
        const [existingMember] = await db.query(
            `SELECT id
             FROM group_members
             WHERE group_id = ?
             AND student_id = ?`,
            [id, studentId]
        );

        if (existingMember.length > 0) {
            return res.status(409).json({
                message: "Student already invited or already a member"
            });
        }

        // Check if student is already in another active group
        const [activeGroups] = await db.query(
            `SELECT rg.id
             FROM rental_groups rg
             JOIN group_members gm
                ON rg.id = gm.group_id
             WHERE gm.student_id = ?
             AND gm.status = 'accepted'
             AND rg.status != 'closed'`,
            [studentId]
        );

        if (activeGroups.length > 0) {
            return res.status(409).json({
                message: "This student is already in an active group"
            });
        }

        // Check apartment capacity if group already has a property
        if (group.property_id) {

            const [properties] = await db.query(
                `SELECT capacity
                 FROM properties
                 WHERE id = ?`,
                [group.property_id]
            );

            if (properties.length > 0) {

                const [memberCount] = await db.query(
                    `SELECT COUNT(*) AS count
                     FROM group_members
                     WHERE group_id = ?
                     AND status = 'accepted'`,
                    [id]
                );

                if (memberCount[0].count >= properties[0].capacity) {
                    return res.status(409).json({
                        message: "Group has reached apartment capacity"
                    });
                }
            }
        }

        // Create invitation
        await db.query(
            `INSERT INTO group_members
             (group_id, student_id, status)
             VALUES (?, ?, 'invited')`,
            [id, studentId]
        );

        res.status(201).json({
            message: "Student invited successfully"
        });

    } catch (error) {
        console.error("Invite student error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==========================================
// ACCEPT INVITATION
// POST /api/groups/:id/accept
// ==========================================
const acceptInvitation = async (req, res) => {
    try {
        const { id } = req.params;

        // Only students can accept
        if (req.user.role !== "student") {
            return res.status(403).json({
                message: "Only students can accept invitations"
            });
        }

        // Find invitation belonging to logged-in student
        const [membership] = await db.query(
            `SELECT *
             FROM group_members
             WHERE group_id = ?
             AND student_id = ?
             AND status = 'invited'`,
            [id, req.user.id]
        );

        if (membership.length === 0) {
            return res.status(404).json({
                message: "Invitation not found"
            });
        }

        // Check if student is already in another active group
        const [existingGroups] = await db.query(
            `SELECT rg.id
             FROM rental_groups rg
             JOIN group_members gm
                ON rg.id = gm.group_id
             WHERE gm.student_id = ?
             AND gm.status = 'accepted'
             AND rg.status != 'closed'`,
            [req.user.id]
        );

        if (existingGroups.length > 0) {
            return res.status(409).json({
                message: "You are already in an active group"
            });
        }

        // Get group
        const [groups] = await db.query(
            `SELECT *
             FROM rental_groups
             WHERE id = ?`,
            [id]
        );

        if (groups.length === 0) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        const group = groups[0];

        // Check apartment capacity
        if (group.property_id) {

            const [properties] = await db.query(
                `SELECT capacity
                 FROM properties
                 WHERE id = ?`,
                [group.property_id]
            );

            if (properties.length > 0) {

                const [memberCount] = await db.query(
                    `SELECT COUNT(*) AS count
                     FROM group_members
                     WHERE group_id = ?
                     AND status = 'accepted'`,
                    [id]
                );

                if (memberCount[0].count >= properties[0].capacity) {
                    return res.status(409).json({
                        message: "Group has reached apartment capacity"
                    });
                }
            }
        }

        // Accept invitation
        await db.query(
            `UPDATE group_members
             SET status = 'accepted'
             WHERE group_id = ?
             AND student_id = ?`,
            [id, req.user.id]
        );

        res.json({
            message: "Invitation accepted successfully"
        });

    } catch (error) {
        console.error("Accept invitation error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createGroup,
    getGroup,
    inviteStudent,
    acceptInvitation
};