const router = require('express').Router();
const truckController = require('../../controller/truckController');

router
  .route('/')
  .get(truckController.findAll)
  .post(truckController.create);

router
  .route('/:id')
  .get(truckController.findOne)
  .delete(truckController.destroy);

router 
  .route('/twitter')
  .put(truckController.update);

router
  .route('/yelp')
  .put(truckController.update);

module.exports = router;
