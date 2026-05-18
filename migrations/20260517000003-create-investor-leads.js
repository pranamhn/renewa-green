"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("investor_leads", {
      id: {
        allowNull:     false,
        autoIncrement: true,
        primaryKey:    true,
        type:          Sequelize.INTEGER.UNSIGNED,
      },
      name: {
        allowNull: false,
        type:      Sequelize.STRING(255),
      },
      email: {
        allowNull: false,
        type:      Sequelize.STRING(255),
      },
      company: {
        allowNull: true,
        type:      Sequelize.STRING(255),
      },
      phone: {
        allowNull: true,
        type:      Sequelize.STRING(20),
      },
      investor_type: {
        allowNull: true,
        type:      Sequelize.ENUM("angel", "vc", "family_office", "esg_fund", "institution", "impact", "other"),
        comment:   "Tipe investor yang mendaftar",
      },
      investment_interest: {
        allowNull: true,
        type:      Sequelize.TEXT,
        comment:   "Deskripsi minat investasi atau pesan dari investor",
      },
      status: {
        allowNull:    false,
        defaultValue: "new",
        type:         Sequelize.ENUM("new", "contacted", "in_discussion", "closed"),
      },
      created_at: {
        allowNull: false,
        type:      Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type:      Sequelize.DATE,
      },
    });

    await queryInterface.addIndex("investor_leads", ["email"]);
    await queryInterface.addIndex("investor_leads", ["investor_type"]);
    await queryInterface.addIndex("investor_leads", ["status"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("investor_leads");
  },
};
