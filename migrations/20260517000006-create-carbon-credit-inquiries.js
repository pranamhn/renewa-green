"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("carbon_credit_inquiries", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ticket_number: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      company_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      contact_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      industry: {
        type: Sequelize.ENUM(
          "energi",
          "manufaktur",
          "konstruksi",
          "logistik",
          "perbankan",
          "teknologi",
          "ritel",
          "other"
        ),
        allowNull: true,
      },
      volume_needed: {
        type: Sequelize.ENUM(
          "lt100",
          "100to500",
          "500to1000",
          "1000to5000",
          "gt5000"
        ),
        allowNull: true,
      },
      timeline: {
        type: Sequelize.ENUM("asap", "q1", "q2", "q3", "q4", "next_year"),
        allowNull: true,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("new", "in_progress", "quoted", "closed"),
        allowNull: false,
        defaultValue: "new",
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

    await queryInterface.addIndex("carbon_credit_inquiries", ["email"]);
    await queryInterface.addIndex("carbon_credit_inquiries", ["status"]);
    await queryInterface.addIndex("carbon_credit_inquiries", ["industry"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("carbon_credit_inquiries");
  },
};
