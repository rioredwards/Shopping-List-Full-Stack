const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const Items = await Item.getAll(req.user.id);
      res.json(Items);
    } catch (e) {
      next(e);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const item = await Item.insert({
        description: req.body.description,
        qty: req.body.qty,
        user_id: req.user.id,
      });
      res.json(item);
    } catch (e) {
      next(e);
    }
  });
