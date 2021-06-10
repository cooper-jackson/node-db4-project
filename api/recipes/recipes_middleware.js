const db = require('../../data/db.config')

const validateId = async (req, res, next) => {
    const { id } = req.params

    try {
        const recipe = db('recipes').where('recipe_id', id).first()
        if(!recipe) {
            next({status: 404, message: 'That recipe does not exist.'})
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    validateId
}