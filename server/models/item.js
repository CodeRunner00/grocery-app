module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {

    val: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // },
    // listId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  Item.associate = (db) => {
    db.Item.belongsTo(db.List);
  };

  return Item;
};
