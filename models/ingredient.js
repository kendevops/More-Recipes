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
