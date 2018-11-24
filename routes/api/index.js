const router = require('express').Router();
const truckRoutes = require('./trucks');
const yelpRoutes = require('./yelp');

// Book routes
router.use('/trucks', truckRoutes);
router.use('/yelpreviews', yelpRoutes);

module.exports = router;
