"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("supplier_leads", {
      id: {
        allowNull:     false,
        autoIncrement: true,
        primaryKey:    true,
        type:          Sequelize.INTEGER.UNSIGNED,
      },
      name: {
        allowNull: false,
        type:      Sequelize.STRING(255),
        comment:   "Nama PIC / contact person",
      },
      email: {
        allowNull: false,
        type:      Sequelize.STRING(255),
      },
      company: {
        allowNull: true,
        type:      Sequelize.STRING(255),
        comment:   "Nama perusahaan supplier",
      },
      phone: {
        allowNull: true,
        type:      Sequelize.STRING(20),
      },
      product_category: {
        allowNull: true,
        type:      Sequelize.ENUM("ev_motor", "battery", "charging", "solar", "recycling", "spare_parts", "other"),
        comment:   "Kategori produk yang ditawarkan",
      },
      product_description: {
        allowNull: true,
        type:      Sequelize.TEXT,
        comment:   "Deskripsi produk dan kapasitas supply",
      },
      status: {
        allowNull:    false,
        defaultValue: "new",
        type:         Sequelize.ENUM("new", "contacted", "qualified", "partner", "rejected"),
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

    await queryInterface.addIndex("supplier_leads", ["email"]);
    await queryInterface.addIndex("supplier_leads", ["product_category"]);
    await queryInterface.addIndex("supplier_leads", ["status"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("supplier_leads");
  },
};
