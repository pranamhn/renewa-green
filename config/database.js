"use strict";
require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "renewa_green_dev",
    host:     process.env.DB_HOST || "127.0.0.1",
    port:     parseInt(process.env.DB_PORT || "3306"),
    dialect:  "mysql",
    timezone: "+07:00",
    logging:  false,
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME_TEST || "renewa_green_test",
    host:     process.env.DB_HOST || "127.0.0.1",
    port:     parseInt(process.env.DB_PORT || "3306"),
    dialect:  "mysql",
    timezone: "+07:00",
    logging:  false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_PROD,
    host:     process.env.DB_HOST,
    port:     parseInt(process.env.DB_PORT || "3306"),
    dialect:  "mysql",
    timezone: "+07:00",
    logging:  false,
  },
};
