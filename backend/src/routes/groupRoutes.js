const express = require("express");

const authenticate = require("../middleware/authMiddleware");

const {
    createGroup,
    getGroup,
    inviteStudent,
    acceptInvitation
} = require("../controllers/groupController");

const router = express.Router();


// Create a new roommate group
router.post("/", authenticate, createGroup);


// Get group information and members
router.get("/:id", authenticate, getGroup);


// Invite a student
router.post("/:id/invite", authenticate, inviteStudent);


// Accept invitation
router.post("/:id/accept", authenticate, acceptInvitation);


module.exports = router;