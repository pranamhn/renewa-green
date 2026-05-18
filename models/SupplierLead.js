"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SupplierLead extends Model {
    static associate(models) {}
  }

  SupplierLead.init(
    {
      id:                  { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name:                { type: DataTypes.STRING(255), allowNull: false },
      email:               { type: DataTypes.STRING(255), allowNull: false },
      company:             { type: DataTypes.STRING(255), allowNull: true },
      phone:               { type: DataTypes.STRING(20), allowNull: true },
      product_category:    { type: DataTypes.ENUM("ev_motor", "battery", "charging", "solar", "recycling", "spare_parts", "other"), allowNull: true },
      product_description: { type: DataTypes.TEXT, allowNull: true },
      status:              { type: DataTypes.ENUM("new", "contacted", "qualified", "partner", "rejected"), allowNull: false, defaultValue: "new" },
    },
    {
      sequelize,
      modelName:  "SupplierLead",
      tableName:  "supplier_leads",
      underscored: true,
    }
  );

  return SupplierLead;
};
