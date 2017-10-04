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
