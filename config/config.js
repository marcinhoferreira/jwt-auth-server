const fs = require('fs');

require('dotenv').config();

module.exports = {
  development: {
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: process.env.BD_DIALECT,
    username: process.env.BD_USER,
    password: process.env.BD_PWD,
    database: process.env.BD_NAME,
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    host: 'localhost',
    port: 5432,
    dialect: process.env.BD_DIALECT,
    username: 'postgres',
    password: '',
    database: 'jwt-auth',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    host: 'localhost',
    port: 5432,
    dialect: process.env.BD_DIALECT,
    username: 'postgres',
    password: '',
    database: 'jwt-auth',
    dialectOptions: {
      bigNumberStrings: true
    }
  }
}