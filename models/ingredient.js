<<<<<<< HEAD
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: false,
    },
  });

  Ingredient.associate = (models) => {
    Ingredient.belongsTo(models.Recipe, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      } });
  };

  return Ingredient;
};
=======
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Ingredient = sequelize.define('Ingredient', {
        name: DataTypes.STRING,
        quantity: DataTypes.INTEGER
    });

    // Class Method
    Ingredient.associate = function (models) {
        //Removes the Ingredients when the Recipe is deleted
        Ingredient.belongsTo(models.Recipe, {onDelete: 'CASCADE'});
    };
    return Ingredient;
}


>>>>>>> Update on development
