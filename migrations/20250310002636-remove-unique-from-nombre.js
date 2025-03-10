'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        // Eliminar el índice único de la columna "nombre"
        await queryInterface.removeIndex('equipos', 'nombre');
    },

    async down(queryInterface, Sequelize) {
        // Restaurar el índice único (opcional)
        await queryInterface.addIndex('equipos', ['nombre'], {
            unique: true,
            name: 'nombre'
        });
    }
};