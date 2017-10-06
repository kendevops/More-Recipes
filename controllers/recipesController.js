const models = require('../models');

const recipes = {

  getAll: (req, res) => {
    // Retrieves all recipes
    const opts = {};
    opts.include = [{ model: models.Ingredient, as: 'Ingredients' },
      { model: models.Review, as: 'Reviews' }];
    const ordering = "[[ 'createdAt',  'ASC' ]]";

    if (req.query.sort === 'upvotes') {
      if (req.query.order === 'asc') {
        ordering = "[[ 'createdAt',  'ASC' ]]";
      } else {
        ordering = "[[ 'createdAt', 'DESC' ]]";
      }
    }

    models.Recipe.findAll(opts, { order: ordering }).then((recipes) => {
      res.json(recipes);
    });
  },

  getById: (req, res) => {
    // Retrieves Recipe By Id
    models.Recipe.find({
      where: {
        id: req.params.recipeId,
      },
      include: [{ model: models.Ingredient, as: 'Ingredients' },
        { model: models.Review, as: 'Reviews' }],
    }).then((recipe) => {
      // If no recipe is found for the given id
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(200).send('No recipe found');
      }
    });
  },

  create: (req, res) => {
    const ingredients = JSON.parse(req.body.ingredients.trim()).values;
    const userId = req.body.userid;
    const recipeName = req.body.name;
    models.User.findById(userId).then((user) => {
      models.Recipe.create({ name: recipeName, votes: 0 }).then((recipe) => {
        recipe.setUser(user);
        for (i = 0; i < ingredients.length; i++) {
          const ingredient = ingredients[i];
          models.Ingredient.create({ name: ingredient.name, quantity: ingredient.quantity })
            .then((ingredient) => {
              ingredient.setRecipe(recipe);
            });
        }
        res.json(recipe);
      });
    });
  },

  update: (req, res) => {
    // Updates Recipe of the Specified Id
    // Retrieves Recipe By Id
    models.Recipe.find({
      where: {
        id: req.params.recipeId,
      },
      include: [{ model: models.Ingredient, as: 'Ingredients' },
        { model: models.Review, as: 'Reviews' }],
    }).then((recipe) => {
      // If no recipe is found for the given id
      if (recipe) {
        recipe.updateAttributes({ name: req.body.name, votes: req.body.votes })
          .then((recipe) => {
            // console.log(recipe.toJSON());
          });
        res.status(200).json(recipe);
      } else {
        res.status(200).send('No recipe found');
      }
    });
  },

  review: (req, res) => {
    // Retrieves Recipe By Id
    models.Recipe.find({
      where: {
        id: req.params.recipeId,
      },
      include: [{ model: models.Review, as: 'Reviews' }],
    }).then((recipe) => {
      // If no recipe is found for the given id
      if (recipe) {
        // recipe.setReviews([{name: req.body.name}]);
        const review = models.Review.create({ name: req.body.name });
        review.setRecipe(recipe);
        res.status(200).json(recipe);
      } else {
        res.status(200).send('No recipe found');
      }
    });
  },

  delete: (req, res) => {
    models.Recipe.destroy({
      where: {
        id: req.params.recipeId,
      },
    }).then((recipe) => {
      if (recipe) {
        res.status(200).json(true);
      } else {
        res.status(200).json(false);
      }
    });
  },
};


module.exports = recipes;
