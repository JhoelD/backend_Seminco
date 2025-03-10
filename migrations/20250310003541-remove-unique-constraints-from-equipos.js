'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {

        // Eliminar el índice único de la columna "codigo"
        await queryInterface.removeIndex('equipos', 'codigo');

        // Eliminar el índice único de la columna "serie"
        await queryInterface.removeIndex('equipos', 'serie');
    },

    async down(queryInterface, Sequelize) {

        // Restaurar el índice único de la columna "codigo" (opcional)
        await queryInterface.addIndex('equipos', ['codigo'], {
            unique: true,
            name: 'codigo'
        });

        // Restaurar el índice único de la columna "serie" (opcional)
        await queryInterface.addIndex('equipos', ['serie'], {
            unique: true,
            name: 'serie'
        });
    }
};