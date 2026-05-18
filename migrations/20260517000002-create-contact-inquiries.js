"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contact_inquiries", {
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
        comment:   "PT / individu, opsional",
      },
      category: {
        allowNull: false,
        type:      Sequelize.ENUM("investor", "mitra", "carbon", "user", "media", "other"),
        comment:   "investor=Investor, mitra=Mitra Pembiayaan, carbon=Carbon Buyer, user=End User EV, media=Media, other=Lainnya",
      },
      message: {
        allowNull: false,
        type:      Sequelize.TEXT,
      },
      status: {
        allowNull:    false,
        defaultValue: "new",
        type:         Sequelize.ENUM("new", "in_progress", "resolved"),
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

    await queryInterface.addIndex("contact_inquiries", ["email"]);
    await queryInterface.addIndex("contact_inquiries", ["category"]);
    await queryInterface.addIndex("contact_inquiries", ["status"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("contact_inquiries");
  },
};
