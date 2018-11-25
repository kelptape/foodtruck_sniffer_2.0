var express = require('express');
var router = express.Router();
const trucksController = require("../../controller/truckController");

// Matches with "/api/trucks"
router.route("/")
  .get(trucksController.findAll)
  .post(trucksController.create);
// Matches with "/api/trucks/map"
router.route("/map")
  .get(trucksController.findForMap)

// Matches with "/api/trucks/:id"
router
  .route("/:id")
  .get(trucksController.findOne)
  .put(trucksController.update)
  .delete(trucksController.destroy);

module.exports = router;
