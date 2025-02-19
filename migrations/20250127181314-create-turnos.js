'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('turnos', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('turnos');
    }
};
