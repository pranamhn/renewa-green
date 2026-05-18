"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InvestorLead extends Model {
    static associate(models) {}
  }

  InvestorLead.init(
    {
      id:                  { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name:                { type: DataTypes.STRING(255), allowNull: false },
      email:               { type: DataTypes.STRING(255), allowNull: false },
      company:             { type: DataTypes.STRING(255), allowNull: true },
      phone:               { type: DataTypes.STRING(20), allowNull: true },
      investor_type:       { type: DataTypes.ENUM("angel", "vc", "family_office", "esg_fund", "institution", "impact", "other"), allowNull: true },
      investment_interest: { type: DataTypes.TEXT, allowNull: true },
      status:              { type: DataTypes.ENUM("new", "contacted", "in_discussion", "closed"), allowNull: false, defaultValue: "new" },
    },
    {
      sequelize,
      modelName:  "InvestorLead",
      tableName:  "investor_leads",
      underscored: true,
    }
  );

  return InvestorLead;
};
