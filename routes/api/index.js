const router = require('express').Router();
const truckRoutes = require('./trucks');
const yelpRoutes = require('./yelp');
 router.use('/trucks', truckRoutes);
 router.use('/yelpreviews', yelpRoutes);
 module.exports = router;