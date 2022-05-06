const express = require("express");
const router  = express.Router();
const SubscriberController = require("../controllers/subscriber.controller");
const FormatValidationMiddleware = require("../middleware/verifyformat.middleware");

/**
 * [GET] /subscribers/
 *   Get all subscribers and their phone numbers. 
 * 
 *   200: OK
 *   400: Bad request
 */
router.get("/", [
  SubscriberController.getAllSubscribers
]);

/**
 * [GET] /subscribers/
 *   Get a subscriber's name by a phone number. 
 * 
 *   200: OK
 *   404: Phone not found
 *   400: Bad request
 */
router.get("/:phone", [
  SubscriberController.getByPhone
]);

/**
 * [POST] /subscribers/create/
 *   Create a new subscriber if not exists with a phone number.
 *   If a subscriber with this input name already exists, push
 *   the phone number to an array of phone numbers. 
 * 
 *   201: Created
 *   400: Bad request
 */
router.post("/create", [
  FormatValidationMiddleware.verifyInput,
  SubscriberController.createNew
]);

/**
 * [POST] /subscribers/delete/
 *   Delete an existing subscriber with phone numbers. 
 * 
 *   201: OK
 *   400: Bad request
 */
router.post("/delete", [
  SubscriberController.remove
]);

module.exports = router;