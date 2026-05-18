"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ev_recipient_leads", {
      id: {
        allowNull:     false,
        autoIncrement: true,
        primaryKey:    true,
        type:          Sequelize.INTEGER.UNSIGNED,
      },
      company_name: {
        allowNull: false,
        type:      Sequelize.STRING(255),
        comment:   "Nama perusahaan / instansi penerima EV",
      },
      pic_name: {
        allowNull: false,
        type:      Sequelize.STRING(255),
        comment:   "Nama Person In Charge",
      },
      email: {
        allowNull: false,
        type:      Sequelize.STRING(255),
      },
      phone: {
        allowNull: false,
        type:      Sequelize.STRING(20),
      },
      npwp: {
        allowNull: true,
        type:      Sequelize.STRING(20),
        comment:   "Nomor Pokok Wajib Pajak perusahaan",
      },
      fleet_type: {
        allowNull: true,
        type:      Sequelize.ENUM("ojek_kurir", "logistik", "korporat", "pemerintah", "dealer", "kampus", "other"),
        comment:   "Tipe penggunaan armada EV",
      },
      estimated_fleet_size: {
        allowNull: true,
        type:      Sequelize.INTEGER.UNSIGNED,
        comment:   "Estimasi jumlah unit EV yang dibutuhkan (min. 10)",
      },
      province: {
        allowNull: true,
        type:      Sequelize.STRING(100),
        comment:   "Provinsi lokasi operasional utama",
      },
      notes: {
        allowNull: true,
        type:      Sequelize.TEXT,
        comment:   "Kebutuhan khusus atau catatan tambahan",
      },
      status: {
        allowNull:    false,
        defaultValue: "new",
        type:         Sequelize.ENUM("new", "contacted", "surveyed", "active", "rejected"),
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

    await queryInterface.addIndex("ev_recipient_leads", ["email"]);
    await queryInterface.addIndex("ev_recipient_leads", ["fleet_type"]);
    await queryInterface.addIndex("ev_recipient_leads", ["status"]);
    await queryInterface.addIndex("ev_recipient_leads", ["province"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("ev_recipient_leads");
  },
};
