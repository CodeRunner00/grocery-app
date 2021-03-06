const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};
console.log('config is ', config);
const sequelize = new Sequelize(config.database, config.username, config.password, config);
// sequelize.sync({force: true});
db.Item = require('./item')(sequelize, Sequelize);
db.List = require('./list')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;