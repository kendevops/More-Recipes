<<<<<<< HEAD
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    votes: DataTypes.INTEGER
  });

  Recipe.associate = (models) => {
    Recipe.hasMany(models.Review);
  };

  Recipe.associate = (models) => {
    Recipe.hasMany(models.Ingredient);
  };

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Recipe;
};
=======

'use strict';
module.exports = (sequelize, DataTypes) => {
    var Recipe = sequelize.define('Recipe', {
        name: DataTypes.STRING,
        votes: DataTypes.INTEGER
    });

    // Class Method
    Recipe.associate = function (models) {
        Recipe.hasMany(models.Ingredient, {as: 'Ingredients'});
        Recipe.belongsTo(models.User, {onDelete: 'CASCADE'});
        Recipe.hasMany(models.Review, {as: 'Reviews'});
    };
    return Recipe;
}


>>>>>>> Update on development
