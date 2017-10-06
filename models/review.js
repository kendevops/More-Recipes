module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    name: DataTypes.STRING,
  });

    // Class Method
  Review.associate = function (models) {
    // Deletes Review when Recipe is deleted
    Review.belongsTo(models.Recipe, { onDelete: 'CASCADE' });
  };

  return Review;
};
