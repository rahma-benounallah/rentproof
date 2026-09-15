const express = require("express");

const {
    getProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
} = require("../controllers/propertyController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProperties);

router.get("/:id", getPropertyById);

router.post("/", authenticate, createProperty);

router.put("/:id", authenticate, updateProperty);

router.delete("/:id", authenticate, deleteProperty);

module.exports = router;