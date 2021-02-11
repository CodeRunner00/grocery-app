const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  "development": {
    "username": "root",
    "password": "root",
    "database": "grocery_app_database",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  // },
  // "test": {
  //   "username": "root",
  //   "password": process.env.DB_PASSWORD,
  //   "database": "mk_cms_test2",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql",
  //   "operatorsAliases": false
  // },
  "production": {
    "username": process.env.RDS_USERNAME,
    "password": process.env.RDS_PASSWORD,
    "database": process.env.RDS_DBNAME,
    "host": process.env.RDS_ENDPOINT,
    "dialect": "mysql",
    "port": process.env.RDS_PORT,
    "operatorsAliases": false
  }
}
