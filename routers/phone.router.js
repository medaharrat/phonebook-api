const express = require("express");
const router = express.Router();
const SubscriberController = require("../controllers/subscriber.controller");

/**
 * [GET] /phones/:name
 *   Get phone numbers of a subscriber 
 * 
 *   200: OK
 *   404: Name not found
 *   400: Bad request
 */
router.get("/:name", [
  SubscriberController.getByName
]);

module.exports = router;
