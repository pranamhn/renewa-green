"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EvCreditApplication extends Model {
    static associate(models) {}
  }

  EvCreditApplication.init(
    {
      id:                   { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      reference_number:     { type: DataTypes.STRING(20), allowNull: false, unique: true },
      name:                 { type: DataTypes.STRING(255), allowNull: false },
      nik:                  { type: DataTypes.CHAR(16), allowNull: false },
      email:                { type: DataTypes.STRING(255), allowNull: false },
      phone:                { type: DataTypes.STRING(20), allowNull: false },
      province:             { type: DataTypes.STRING(100), allowNull: false },
      city:                 { type: DataTypes.STRING(100), allowNull: false },
      ev_model:             { type: DataTypes.ENUM("standard", "urban", "pro", "cargo"), allowNull: false },
      down_payment_pct:     { type: DataTypes.ENUM("0", "10", "20", "30"), allowNull: false },
      tenor_months:         { type: DataTypes.ENUM("12", "18", "24", "36"), allowNull: false },
      employment_status:    { type: DataTypes.ENUM("karyawan", "pns", "wiraswasta", "profesional", "lainnya"), allowNull: false },
      monthly_income_range: { type: DataTypes.ENUM("lt3", "3to5", "5to10", "10to20", "gt20"), allowNull: false },
      agreed_to_terms:      { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      status:               { type: DataTypes.ENUM("pending", "reviewing", "approved", "rejected"), allowNull: false, defaultValue: "pending" },
      notes:                { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      modelName:  "EvCreditApplication",
      tableName:  "ev_credit_applications",
      underscored: true,
    }
  );

  return EvCreditApplication;
};
