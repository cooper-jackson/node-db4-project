const db = require('../../data/db.config')

async function getRecipeById(recipe_id) {
    const recipe = await db('recipes as r')
    .leftJoin('steps as s', 'r.recipe_id', 's.recipe_id')
    .leftJoin('step_ingredients as si', 'si.step_id', 's.step_id')
    .leftJoin('ingredients as i', 'i.ingredient_id', 'si.ingredient_id')
    .select('r.recipe_id', 'r.recipe_name', 'r.created_at', 's.step_id', 's.step_number', 
    's.step_text', 'si.ingredient_id', 'i.ingredient_name', 'si.quantity')
    .where('r.recipe_id', recipe_id)
    .orderBy('s.step_id', 'asc')
    console.log(recipe)
    return ({
        recipe_id: recipe[0].recipe_id,
        recipe_name: recipe[0].recipe_name,
        created_at: recipe[0].created_at,
        steps: recipe.map(step => {
            return {
                step_id: step.step_id,
                step_number: step.step_number,
                step_instructions: step.step_text,
                ingredients: [{
                    ingredient_id: step.ingredient_id,
                    ingredient_name: step.ingredient_name,
                    quantity: step.quantity
                }]
            }
        })
    })
}

module.exports = { getRecipeById }