"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CarbonCreditInquiry extends Model {
    static associate(models) {}
  }

  CarbonCreditInquiry.init(
    {
      id:             { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      ticket_number:  { type: DataTypes.STRING(20), allowNull: false, unique: true },
      company_name:   { type: DataTypes.STRING(255), allowNull: false },
      contact_name:   { type: DataTypes.STRING(255), allowNull: false },
      email:          { type: DataTypes.STRING(255), allowNull: false },
      phone:          { type: DataTypes.STRING(20), allowNull: false },
      industry:       { type: DataTypes.ENUM("energi", "manufaktur", "konstruksi", "logistik", "perbankan", "teknologi", "ritel", "other"), allowNull: true },
      volume_needed:  { type: DataTypes.ENUM("lt100", "100to500", "500to1000", "1000to5000", "gt5000"), allowNull: true },
      timeline:       { type: DataTypes.ENUM("asap", "q1", "q2", "q3", "q4", "next_year"), allowNull: true },
      message:        { type: DataTypes.TEXT, allowNull: true },
      status:         { type: DataTypes.ENUM("new", "in_progress", "quoted", "closed"), allowNull: false, defaultValue: "new" },
    },
    {
      sequelize,
      modelName:   "CarbonCreditInquiry",
      tableName:   "carbon_credit_inquiries",
      underscored: true,
    }
  );

  return CarbonCreditInquiry;
};
