const express = require("express");
const authenticate = require("../middleware/authMiddleware");

const {
    createAgreement,
    getAgreements,
    getAgreement,
    acceptAgreement
} = require("../controllers/agreementController");

const router = express.Router();

router.post("/", authenticate, createAgreement);

router.get("/", authenticate, getAgreements);

router.get("/:id", authenticate, getAgreement);

router.post("/:id/accept", authenticate, acceptAgreement);

module.exports = router;