const { throws } = require("assert");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // nikcname: {
    //   type: DataTypes.STRING(20),
    //   allowNull: false,
    //   defaultValue: 'user'
    // },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    }
    // email: {
    //   type: DataTypes.STRING(100),
    //   allowNull: false,
    //   unique: true
    // },
    // password: {
    //   type: DataTypes.STRING(100),
    //   allowNull: false
    // },
    // active: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: true
    // }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  // Define relationship with other Models
  User.associate = (db) => {
    db.User.hasMany(db.List, { as: "Lists" });
  }

  return User;
};


  