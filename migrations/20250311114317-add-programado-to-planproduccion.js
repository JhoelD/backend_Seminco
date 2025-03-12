'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('planproduccions', 'programado', {
            type: Sequelize.ENUM('Programado', 'No Programado'),
            allowNull: false,
            defaultValue: 'Programado'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('planproduccions', 'programado');
    }
};
