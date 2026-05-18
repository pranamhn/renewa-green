"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class VehicleRegistration extends Model {
    static associate(models) {}
  }

  VehicleRegistration.init(
    {
      id:              { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      registration_id: { type: DataTypes.STRING(20), allowNull: false, unique: true },
      name:            { type: DataTypes.STRING(255), allowNull: false },
      phone:           { type: DataTypes.STRING(20), allowNull: false },
      email:           { type: DataTypes.STRING(255), allowNull: false },
      ev_brand:        { type: DataTypes.ENUM("Honda EM1 e:", "Yamaha E-Vino", "Gesits G1", "Selis Agats", "Volta 401", "Alva One", "United T1800", "Smoot Tempur", "NIU MQi+", "Lainnya"), allowNull: false },
      ev_model:        { type: DataTypes.STRING(100), allowNull: true },
      license_plate:   { type: DataTypes.STRING(20), allowNull: false },
      province:        { type: DataTypes.STRING(100), allowNull: false },
      city:            { type: DataTypes.STRING(100), allowNull: false },
      source:          { type: DataTypes.ENUM("sosmed", "teman", "komunitas", "dealer", "google", "other"), allowNull: true },
      status:          { type: DataTypes.ENUM("pending", "verified", "active", "rejected"), allowNull: false, defaultValue: "pending" },
    },
    {
      sequelize,
      modelName:   "VehicleRegistration",
      tableName:   "vehicle_registrations",
      underscored: true,
    }
  );

  return VehicleRegistration;
};
