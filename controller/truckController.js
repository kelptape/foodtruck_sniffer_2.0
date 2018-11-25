const db = require('../models');
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  findAll: (req, res) => {
    db.FoodTruck
      .findAll({include: [ db.YelpReview ]})
      .then(dbFoodTrucks => res.json(dbFoodTrucks))
      .catch(err => res.status(422).json(err));
  },

  findForMap: (req, res) => {
    db.FoodTruck
      .findAll({where: { lat: {[Op.between]: [req.query.lowLat, req.query.highLat ]}, long: {[Op.between]: [req.query.lowLong, req.query.highLong ]}}, include: [ db.YelpReview ]})
      .then(dbFoodTrucks => res.json(dbFoodTrucks))
      .catch(err => res.status(422).json(err));
  },

  findOne: (req, res) => {
    db.FoodTruck
      .findOne({ where: { id: req.params.id }, include: [ db.YelpReview ]})
      .then(dbFoodTruck => res.json(dbFoodTruck))
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    db.FoodTruck
      .create(req.body)
      .then(dbFoodTruck => { res.json(dbFoodTruck) })
      .catch(err => res.status(422).json(err));
  },

  update: (req, res) => {
    db.FoodTruck
      .update({ 
        address: req.body.location, addressUpdated: req.body.created_at 
      }, { 
        where: { twiterId: req.body.screen_name }})
      .then(dbFoodTruck => res.json( dbFoodTruck ))
      .catch(err => res.status(422).json(err));
  },

  destroy: (req, res) => {
    db.FoodTruck
      .destroy({ where: { id: req.params.id }})
      .then(dbFoodTruck => res.json(dbFoodTruck))
      .catch(err => res.status(422).json(err));
  }
}