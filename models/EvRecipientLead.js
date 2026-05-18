"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EvRecipientLead extends Model {
    static associate(models) {}
  }

  EvRecipientLead.init(
    {
      id:                   { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      company_name:         { type: DataTypes.STRING(255), allowNull: false },
      pic_name:             { type: DataTypes.STRING(255), allowNull: false },
      email:                { type: DataTypes.STRING(255), allowNull: false },
      phone:                { type: DataTypes.STRING(20), allowNull: false },
      npwp:                 { type: DataTypes.STRING(20), allowNull: true },
      fleet_type:           { type: DataTypes.ENUM("ojek_kurir", "logistik", "korporat", "pemerintah", "dealer", "kampus", "other"), allowNull: true },
      estimated_fleet_size: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
      province:             { type: DataTypes.STRING(100), allowNull: true },
      notes:                { type: DataTypes.TEXT, allowNull: true },
      status:               { type: DataTypes.ENUM("new", "contacted", "surveyed", "active", "rejected"), allowNull: false, defaultValue: "new" },
    },
    {
      sequelize,
      modelName:  "EvRecipientLead",
      tableName:  "ev_recipient_leads",
      underscored: true,
    }
  );

  return EvRecipientLead;
};
