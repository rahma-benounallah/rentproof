const express = require("express");
const authenticate = require("../middleware/authMiddleware");

const {
  createRentalRequest,
  getRentalRequests,
  acceptRentalRequest,
  rejectRentalRequest
} = require("../controllers/rentalRequestController");

const router = express.Router();

router.post("/", authenticate, createRentalRequest);

router.get("/", authenticate, getRentalRequests);

router.patch("/:id/accept", authenticate, acceptRentalRequest);

router.patch("/:id/reject", authenticate, rejectRentalRequest);

module.exports = router;