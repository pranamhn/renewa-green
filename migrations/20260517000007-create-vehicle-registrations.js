"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("vehicle_registrations", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      registration_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      ev_brand: {
        type: Sequelize.ENUM(
          "Honda EM1 e:",
          "Yamaha E-Vino",
          "Gesits G1",
          "Selis Agats",
          "Volta 401",
          "Alva One",
          "United T1800",
          "Smoot Tempur",
          "NIU MQi+",
          "Lainnya"
        ),
        allowNull: false,
      },
      ev_model: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      license_plate: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      province: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      source: {
        type: Sequelize.ENUM(
          "sosmed",
          "teman",
          "komunitas",
          "dealer",
          "google",
          "other"
        ),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("pending", "verified", "active", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex("vehicle_registrations", ["email"]);
    await queryInterface.addIndex("vehicle_registrations", ["license_plate"], { unique: true });
    await queryInterface.addIndex("vehicle_registrations", ["status"]);
    await queryInterface.addIndex("vehicle_registrations", ["province"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("vehicle_registrations");
  },
};
