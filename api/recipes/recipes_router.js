const express = require('express');
const helpers = require('./recipes_model')
const router = express.Router();
const md = require('./recipes_middleware')


router.get('/:id', md.validateId, (req, res, next) => {
    const recipe_id = req.params.id
    helpers.getRecipeById(recipe_id)
    .then(recipe => {
        res.status(200).json(recipe)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
