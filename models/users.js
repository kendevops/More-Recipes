module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    allowNull: false,
  });

  User.associate = (models) => {
    User.hasMany(models.Recipe);
  };

  return User;
};

