"use strict";
const { Sequelize } = require("sequelize");
const config = require("../config/database.js");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

const db = {
  sequelize,
  Sequelize,
  EvCreditApplication: require("./EvCreditApplication")(sequelize, Sequelize.DataTypes),
  ContactInquiry:      require("./ContactInquiry")(sequelize, Sequelize.DataTypes),
  InvestorLead:        require("./InvestorLead")(sequelize, Sequelize.DataTypes),
  SupplierLead:        require("./SupplierLead")(sequelize, Sequelize.DataTypes),
  EvRecipientLead:     require("./EvRecipientLead")(sequelize, Sequelize.DataTypes),
};

Object.values(db).forEach((model) => {
  if (model?.associate) model.associate(db);
});

module.exports = db;
