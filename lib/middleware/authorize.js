const Item = require('../models/Item.js');

module.exports = async (req, res, next) => {
  try {
    const item = await Item.getById(req.params.id);
    if (item.user_id !== req.user.id)
      throw new Error('You are not authorized to modify this item!');

    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
