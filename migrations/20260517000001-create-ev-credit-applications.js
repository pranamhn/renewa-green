"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ev_credit_applications", {
      id: {
        allowNull:     false,
        autoIncrement: true,
        primaryKey:    true,
        type:          Sequelize.INTEGER.UNSIGNED,
      },
      reference_number: {
        allowNull: false,
        unique:    true,
        type:      Sequelize.STRING(20),
        comment:   "Format: RNW-XXXXXX",
      },
      // ── Personal Info ──────────────────────────────────────
      name: {
        allowNull: false,
        type:      Sequelize.STRING(255),
        comment:   "Nama sesuai KTP",
      },
      nik: {
        allowNull: false,
        type:      Sequelize.CHAR(16),
        comment:   "Nomor Induk Kependudukan 16 digit",
      },
      email: {
        allowNull: false,
        type:      Sequelize.STRING(255),
      },
      phone: {
        allowNull: false,
        type:      Sequelize.STRING(20),
        comment:   "No. HP / WhatsApp",
      },
      // ── Address ────────────────────────────────────────────
      province: {
        allowNull: false,
        type:      Sequelize.STRING(100),
      },
      city: {
        allowNull: false,
        type:      Sequelize.STRING(100),
        comment:   "Kota atau Kabupaten",
      },
      // ── EV Preferences ─────────────────────────────────────
      ev_model: {
        allowNull: false,
        type:      Sequelize.ENUM("standard", "urban", "pro", "cargo"),
        comment:   "standard=Rp15-20jt, urban=Rp20-28jt, pro=Rp28-40jt, cargo=Rp35-55jt",
      },
      down_payment_pct: {
        allowNull: false,
        type:      Sequelize.ENUM("0", "10", "20", "30"),
        comment:   "Persentase uang muka",
      },
      tenor_months: {
        allowNull: false,
        type:      Sequelize.ENUM("12", "18", "24", "36"),
        comment:   "Durasi cicilan dalam bulan",
      },
      // ── Financial Info ─────────────────────────────────────
      employment_status: {
        allowNull: false,
        type:      Sequelize.ENUM("karyawan", "pns", "wiraswasta", "profesional", "lainnya"),
      },
      monthly_income_range: {
        allowNull: false,
        type:      Sequelize.ENUM("lt3", "3to5", "5to10", "10to20", "gt20"),
        comment:   "lt3=<3jt, 3to5=3-5jt, 5to10=5-10jt, 10to20=10-20jt, gt20=>20jt",
      },
      // ── Meta ───────────────────────────────────────────────
      agreed_to_terms: {
        allowNull:    false,
        defaultValue: false,
        type:         Sequelize.BOOLEAN,
      },
      status: {
        allowNull:    false,
        defaultValue: "pending",
        type:         Sequelize.ENUM("pending", "reviewing", "approved", "rejected"),
      },
      notes: {
        allowNull: true,
        type:      Sequelize.TEXT,
        comment:   "Catatan internal tim",
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

    await queryInterface.addIndex("ev_credit_applications", ["email"]);
    await queryInterface.addIndex("ev_credit_applications", ["nik"]);
    await queryInterface.addIndex("ev_credit_applications", ["status"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("ev_credit_applications");
  },
};
