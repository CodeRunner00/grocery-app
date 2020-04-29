module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('list', {
    
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  List.associate = (db) => {
    db.List.hasMany(db.Item);
    db.List.belongsTo(db.User);
  };

  return List;
};

