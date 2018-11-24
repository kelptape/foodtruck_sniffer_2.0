const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    var query = {};
    if (req.query.truck_id) {
      query.FoodTruckId = req.query.truck_id;
    }
    db.YelpReview
      .findAll({ where: query, include: [ db.FoodTruck ]})
      .then(dbYelpReview => res.json(dbYelpReview))
      .catch(err => res.status(422).json(err));
  },

  findOne: (req, res) => {
    db.YelpReview
      .findOne({ where: { id: req.params.id }, include: [ db.FoodTruck ]})
      .then(dbYelpReview => res.json(dbYelpReview))
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    db.YelpReview
      .create(req.body)
      .then(dbYelpReview => res.json(dbYelpReview))
      .catch(err => res.status(422).json(err));
  },

  destroy: (req, res) => {
    db.YelpReview
      .destroy({ where: { id: req.params.id }})
      .then(dbYelpReview => res.json(dbYelpReview))
      .catch(err => res.status(422).json(err));
  },

  update: (req, res) => {
    db.YelpReview
      .update(req.body, { where: { id: req.body.id }})
      .then(dbYelpReview => res.json(dbYelpReview))
      .catch(err => res.status(422).json(err));
  }
}