const { Router } = require('express');
const authorize = require('../middleware/authorize.js');
const Item = require('../models/Item');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const Items = await Item.getAll(req.user.id);
      res.json(Items);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
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
  })
  .put('/:id', authorize, async (req, res, next) => {
    try {
      const id = req.params.id;
      const updateItem = {
        bought: req.body.bought,
      };
      const item = await Item.updateById(id, updateItem);
      res.json(item);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', authorize, async (req, res, next) => {
    try {
      const id = req.params.id;
      const item = await Item.delete(id);
      res.json(item);
    } catch (e) {
      next(e);
    }
  });
