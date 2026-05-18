"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ContactInquiry extends Model {
    static associate(models) {}
  }

  ContactInquiry.init(
    {
      id:       { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name:     { type: DataTypes.STRING(255), allowNull: false },
      email:    { type: DataTypes.STRING(255), allowNull: false },
      company:  { type: DataTypes.STRING(255), allowNull: true },
      category: { type: DataTypes.ENUM("investor", "mitra", "carbon", "user", "media", "other"), allowNull: false },
      message:  { type: DataTypes.TEXT, allowNull: false },
      status:   { type: DataTypes.ENUM("new", "in_progress", "resolved"), allowNull: false, defaultValue: "new" },
    },
    {
      sequelize,
      modelName:  "ContactInquiry",
      tableName:  "contact_inquiries",
      underscored: true,
    }
  );

  return ContactInquiry;
};
