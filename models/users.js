module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
<<<<<<< HEAD
    allowNull: false,
  });

  User.associate = (models) => {
    User.hasMany(models.Recipe);
  };

=======
  });
    // Class Method
  User.associate = (models) => {
    User.hasMany(models.Recipe, { as: 'Recipes' });
  };

  // Instance Method
  // Model.prototype.someMethod = function () {..}

>>>>>>> Update on development
  return User;
};

