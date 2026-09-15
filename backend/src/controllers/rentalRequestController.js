const db = require("../database/connection");

// CREATE RENTAL REQUEST
const createRentalRequest = async (req, res) => {
  try {
    const { groupId, propertyId } = req.body;

    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can create rental requests"
      });
    }

    if (!groupId || !propertyId) {
      return res.status(400).json({
        message: "groupId and propertyId are required"
      });
    }

    // Check that the student belongs to the group
    const [memberships] = await db.query(
      `SELECT id
       FROM group_members
       WHERE group_id = ?
       AND student_id = ?
       AND status = 'accepted'`,
      [groupId, req.user.id]
    );

    if (memberships.length === 0) {
      return res.status(403).json({
        message: "You are not a member of this group"
      });
    }

    // Check property
    const [properties] = await db.query(
      `SELECT id, landlord_id, capacity
       FROM properties
       WHERE id = ?`,
      [propertyId]
    );

    if (properties.length === 0) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    // Check if request already exists
    const [existingRequests] = await db.query(
      `SELECT id
       FROM rental_requests
       WHERE group_id = ?
       AND property_id = ?
       AND status = 'pending'`,
      [groupId, propertyId]
    );

    if (existingRequests.length > 0) {
      return res.status(409).json({
        message: "Request already exists"
      });
    }

    // Create request
    const [result] = await db.query(
      `INSERT INTO rental_requests
       (group_id, property_id, status)
       VALUES (?, ?, 'pending')`,
      [groupId, propertyId]
    );

    res.status(201).json({
      message: "Rental request sent successfully",
      requestId: result.insertId
    });

  } catch (error) {
    console.error("Create rental request error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// GET RENTAL REQUESTS
const getRentalRequests = async (req, res) => {
  try {

    // LANDLORD: requests for their properties
    if (req.user.role === "landlord") {

      const [requests] = await db.query(
        `SELECT
          rr.id,
          rr.group_id,
          rr.property_id,
          rr.status,
          rr.created_at,
          p.title AS property_title
        FROM rental_requests rr
        JOIN properties p
          ON rr.property_id = p.id
        WHERE p.landlord_id = ?
        ORDER BY rr.created_at DESC`,
        [req.user.id]
      );

      return res.json(requests);
    }


    // STUDENT: requests belonging to their groups
    const [requests] = await db.query(
      `SELECT
        rr.id,
        rr.group_id,
        rr.property_id,
        rr.status,
        rr.created_at,
        p.title AS property_title
      FROM rental_requests rr
      JOIN properties p
        ON rr.property_id = p.id
      JOIN group_members gm
        ON rr.group_id = gm.group_id
      WHERE gm.student_id = ?
      AND gm.status = 'accepted'
      ORDER BY rr.created_at DESC`,
      [req.user.id]
    );

    res.json(requests);

  } catch (error) {
    console.error("Get rental requests error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// ACCEPT RENTAL REQUEST
const acceptRentalRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "landlord") {
      return res.status(403).json({
        message: "Only landlords can accept requests"
      });
    }

    // Find request + property owner
    const [requests] = await db.query(
      `SELECT
        rr.*,
        p.landlord_id
      FROM rental_requests rr
      JOIN properties p
        ON rr.property_id = p.id
      WHERE rr.id = ?`,
      [id]
    );

    if (requests.length === 0) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    const request = requests[0];

    // Check property ownership
    if (Number(request.landlord_id) !== Number(req.user.id)) {
      return res.status(403).json({
        message: "You do not own this property"
      });
    }

    if (request.status !== "pending") {
      return res.status(409).json({
        message: "Request is no longer pending"
      });
    }

    // Accept request
    await db.query(
      `UPDATE rental_requests
       SET status = 'accepted'
       WHERE id = ?`,
      [id]
    );

    // Connect group to property
    await db.query(
      `UPDATE rental_groups
       SET property_id = ?,
           status = 'ready'
       WHERE id = ?`,
      [request.property_id, request.group_id]
    );

    res.json({
      message: "Rental request accepted successfully"
    });

  } catch (error) {
    console.error("Accept rental request error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// REJECT RENTAL REQUEST
const rejectRentalRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "landlord") {
      return res.status(403).json({
        message: "Only landlords can reject requests"
      });
    }

    const [requests] = await db.query(
      `SELECT
        rr.*,
        p.landlord_id
      FROM rental_requests rr
      JOIN properties p
        ON rr.property_id = p.id
      WHERE rr.id = ?`,
      [id]
    );

    if (requests.length === 0) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    if (Number(requests[0].landlord_id) !== Number(req.user.id)) {
      return res.status(403).json({
        message: "You do not own this property"
      });
    }

    if (requests[0].status !== "pending") {
      return res.status(409).json({
        message: "Request is no longer pending"
      });
    }

    await db.query(
      `UPDATE rental_requests
       SET status = 'rejected'
       WHERE id = ?`,
      [id]
    );

    res.json({
      message: "Rental request rejected successfully"
    });

  } catch (error) {
    console.error("Reject rental request error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


module.exports = {
  createRentalRequest,
  getRentalRequests,
  acceptRentalRequest,
  rejectRentalRequest
};