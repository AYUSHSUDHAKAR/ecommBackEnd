const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const router = express.Router();
const { stripePayment } = require("../controllers/stripe");

router.post("/stripepayment", stripePayment);

module.exports = router;
