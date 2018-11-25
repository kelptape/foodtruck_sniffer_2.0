const router = require('express').Router();
const yelpController = require('../../controller/yelpController');
 router
  .route('/')
  .get(yelpController.findAll)
  .post(yelpController.create)
  .put(yelpController.update);
 router
  .route('/:id')
  .get(yelpController.findOne)
  .delete(yelpController.destroy);
 module.exports = router; 