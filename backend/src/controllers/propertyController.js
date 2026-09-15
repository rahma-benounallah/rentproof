const db = require("../database/connection");

// GET ALL PROPERTIES
const getProperties = async (req, res) => {
    try {
        const [properties] = await db.query(
            `SELECT 
                p.id,
                p.title,
                p.address,
                p.city,
                p.description,
                p.capacity,
                p.price,
                p.verification_status,
                p.landlord_id,
                u.name AS landlord_name
             FROM properties p
             JOIN users u ON p.landlord_id = u.id
             ORDER BY p.created_at DESC`
        );

        res.json(properties);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// GET ONE PROPERTY
const getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;

        const [properties] = await db.query(
            `SELECT 
                p.id,
                p.title,
                p.address,
                p.city,
                p.description,
                p.capacity,
                p.price,
                p.verification_status,
                p.landlord_id,
                u.name AS landlord_name
             FROM properties p
             JOIN users u ON p.landlord_id = u.id
             WHERE p.id = ?`,
            [id]
        );

        if (properties.length === 0) {
            return res.status(404).json({
                message: "Property not found"
            });
        }

        res.json(properties[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// CREATE PROPERTY
const createProperty = async (req, res) => {
    try {
        const {
            title,
            address,
            city,
            description,
            capacity,
            price
        } = req.body;

        if (!title || !address || !capacity || !price) {
            return res.status(400).json({
                message: "Title, address, capacity and price are required"
            });
        }

        // Only landlords can create properties
        if (req.user.role !== "landlord") {
            return res.status(403).json({
                message: "Only landlords can create properties"
            });
        }

        const landlordId = req.user.id;

        const [result] = await db.query(
            `INSERT INTO properties
            (landlord_id, title, address, city, description, capacity, price)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                landlordId,
                title,
                address,
                city || "Gabès",
                description || null,
                capacity,
                price
            ]
        );

        res.status(201).json({
            message: "Property created successfully",
            propertyId: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// UPDATE PROPERTY
const updateProperty = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            address,
            city,
            description,
            capacity,
            price
        } = req.body;

        // Only landlords can update
        if (req.user.role !== "landlord") {
            return res.status(403).json({
                message: "Only landlords can update properties"
            });
        }

        // Find the property
        const [properties] = await db.query(
            "SELECT * FROM properties WHERE id = ?",
            [id]
        );

        // Property doesn't exist
        if (properties.length === 0) {
            return res.status(404).json({
                message: "Property not found"
            });
        }

        // Check that this landlord owns the property
        if (properties[0].landlord_id !== req.user.id) {
            return res.status(403).json({
                message: "You can only update your own properties"
            });
        }

        // Update the property
        await db.query(
            `UPDATE properties
             SET title = ?,
                 address = ?,
                 city = ?,
                 description = ?,
                 capacity = ?,
                 price = ?
             WHERE id = ?`,
            [
                title,
                address,
                city,
                description,
                capacity,
                price,
                id
            ]
        );

        res.json({
            message: "Property updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// DELETE PROPERTY
const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;

        // Only landlords can delete
        if (req.user.role !== "landlord") {
            return res.status(403).json({
                message: "Only landlords can delete properties"
            });
        }

        // Find the property
        const [properties] = await db.query(
            "SELECT * FROM properties WHERE id = ?",
            [id]
        );

        // Property doesn't exist
        if (properties.length === 0) {
            return res.status(404).json({
                message: "Property not found"
            });
        }

        // Check that this landlord owns the property
        if (properties[0].landlord_id !== req.user.id) {
            return res.status(403).json({
                message: "You can only delete your own properties"
            });
        }

        // Delete
        await db.query(
            "DELETE FROM properties WHERE id = ?",
            [id]
        );

        res.json({
            message: "Property deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    getProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
};