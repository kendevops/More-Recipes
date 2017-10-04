var models = require('../models');

// Datastore
var repository = {
    "recipes": [
        {
            "name": "Crock Pot Roast",
            "id": "1",
            "ingredients":
                [
                    {
                        "quantity": "1",
                        "name": " beef roast"
                    },
                    {
                        "quantity": "1 package",
                        "name": "brown gravy mix"
                    },
                    {
                        "quantity": "1 package",
                        "name": "dried Italian salad dressing mix"
                    },
                    {
                        "quantity": "1 package",
                        "name": "dry ranch dressing mix"
                    },
                    {
                        "quantity": "1/2 cup",
                        "name": "water"
                    }
                ],
            "reviews": [],
            "votes": 1

        },
        {
            "name": "Crock Pot Roast",
            "id": "2",
            "ingredients":
                [
                    {
                        "quantity": "1",
                        "name": " beef roast"
                    },
                    {
                        "quantity": "1 package",
                        "name": "brown gravy mix"
                    },
                    {
                        "quantity": "1 package",
                        "name": "dried Italian salad dressing mix"
                    },
                    {
                        "quantity": "1 package",
                        "name": "dry ranch dressing mix"
                    },
                    {
                        "quantity": "1/2 cup",
                        "name": "water"
                    }
                ],
            "reviews": [],
            "votes": 0


        },
        {
            "name": "Crock Pot Roast",
            "id": "3",
            "ingredients":
                [
                    {
                        "quantity": "1",
                        "name": " beef roast"
                    },
                    {
                        "quantity": "1 package",
                        "name": "brown gravy mix"
                    },
                    {
                        "quantity": "1 package",
                        "name": "dried Italian salad dressing mix"
                    },
                    {
                        "quantity": "1 package",
                        "name": "dry ranch dressing mix"
                    },
                    {
                        "quantity": "1/2 cup",
                        "name": "water"
                    }
                ],
            "reviews": [],
            "votes": 4


        },
        {
            "name": "Crock Pot Roast",
            "id": "4",

            "ingredients":
                [
                    {
                        "quantity": "1",
                        "name": " beef roast"
                    },
                    {
                        "quantity": "1 package",
                        "name": "brown gravy mix"
                    },
                    {
                        "quantity": "1 package",
                        "name": "dried Italian salad dressing mix"
                    },
                    {
                        "quantity": "1 package",
                        "name": "dry ranch dressing mix"
                    },
                    {
                        "quantity": "1/2 cup",
                        "name": "water"
                    }
                ],
            "reviews": [],
            "votes": 3


        },
        {
            "name": "Crock Pot Roast",
            "id": "5",
            "ingredients":
                [
                    {
                        "quantity": "1",
                        "name": " beef roast"
                    },
                    {
                        "quantity": "1 package",
                        "name": "brown gravy mix"
                    },
                    {
                        "quantity": "1 package",
                        "name": "dried Italian salad dressing mix"
                    },
                    {
                        "quantity": "1 package",
                        "name": "dry ranch dressing mix"
                    },
                    {
                        "quantity": "1/2 cup",
                        "name": "water"
                    }
                ],
            "reviews": [],
            "votes": 10


        }
    ]
};

var recipes = {

    getAll: function (req, res) {
        // Retrieves all recipes
        var sort = req.query.sort;
        var order = req.query.order;
        var allRecipes = repository.recipes;

        if (sort === "upvotes") {
            if (order === "des") {
                allRecipes.sort(function (a, b) {
                    return b.votes - a.votes;
                });
            }
            else {
                allRecipes.sort(function (a, b) {
                    return a.votes - b.votes;
                });
            }
        }

        res.status(200).json(allRecipes);
    },

    getById: function (req, res) {
        //Retrieves Recipe By Id
        //console.log(req.param);
        var id = req.param('recipeId');
        var recipe = repository.recipes.filter(function (recipe) {
            return (recipe.id === id)
        });

        // If no recipe is found for the given id
        if (recipe.length === 0) {
            res.status(200).send('No recipe found');
        }
        else {
            res.status(200).json(recipe);
        }
    },

    create: function (req, res) {

        var newRecipe = models.Recipe.create({
            name: req.body.name,
            votes: 0,
            Ingredient: {
                name: req.body.name,
                quantity: req.body.quantity
            }
        }, {
            include: [ models.Ingredient ]
        });

        // Creates a new recipe
        res.status(200).json(newRecipe);
    },

    update: function (req, res) {
        // Updates Recipe of the Specified Id
        var id = req.params.recipeId;
        var recipeName = req.body.name;
        var recipeIngredients = req.body.ingredients;
        var recipeReviews = req.body.reviews;

        // Retrieves Recipe From Datastore
        var recipe = repository.recipes.filter(function (recipe) {
            return (recipe.id === id)
        });

        // If no recipe was found for the given id
        if (recipe.length === 0) {
            res.status(200).send('No recipe found');
        }
        else {
            //Update fields
            recipe[0].id = id;
            recipe[0].name = recipeName;
            recipe[0].ingredients = recipeIngredients;
            recipe[0].reviews = recipeReviews;
            res.json(recipe[0]);
        }
    },

    review: function (req, res) {
        // Deletes Recipe of the Specified Id
        var id = req.params.recipeId;
        var recipeReviews = req.body.reviews;
        var recipe = repository.recipes.filter(function (recipe) {
            return (recipe.id === id)
        });

        // If no recipe was found for the given id
        if (recipe.length === 0) {
            res.status(200).send('No recipe found');
        }
        else {
            recipe[0].reviews.push(recipeReviews);
            res.json(recipe);
        }

    },

    delete: function (req, res) {
        // Review Recipe of the Specified Id
        var id = req.params.recipeId;
        var recipe = repository.recipes.filter(function (recipe) {
            return (recipe.id === id)
        });

        if (recipe.length > 0) {
            repository.recipes.splice(id, 1);
            res.status(200).json(true);
        }
        else {
            res.status(200).json(false);
        }

    }
};


module.exports = recipes;