module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    name: DataTypes.STRING
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Recipe, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Review;
};
