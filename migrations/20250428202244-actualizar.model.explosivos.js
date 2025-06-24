'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar nuevos campos a nube_datos_trabajo_exploraciones
    await queryInterface.addColumn('nube_datos_trabajo_exploraciones', 'ala', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('nube_datos_trabajo_exploraciones', 'envio', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
    await queryInterface.addColumn('nube_datos_trabajo_exploraciones', 'semanaDefault', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('nube_datos_trabajo_exploraciones', 'semanaSelect', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('nube_datos_trabajo_exploraciones', 'empresa', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Agregar campo observaciones a nube_despacho
    await queryInterface.addColumn('nube_despacho', 'observaciones', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    // Agregar campo observaciones a nube_devoluciones
    await queryInterface.addColumn('nube_devoluciones', 'observaciones', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Revertir los cambios en caso de rollback
    await queryInterface.removeColumn('nube_datos_trabajo_exploraciones', 'ala');
    await queryInterface.removeColumn('nube_datos_trabajo_exploraciones', 'envio');
    await queryInterface.removeColumn('nube_datos_trabajo_exploraciones', 'semanaDefault');
    await queryInterface.removeColumn('nube_datos_trabajo_exploraciones', 'semanaSelect');
    await queryInterface.removeColumn('nube_datos_trabajo_exploraciones', 'empresa');
    
    await queryInterface.removeColumn('nube_despacho', 'observaciones');
    
    await queryInterface.removeColumn('nube_devoluciones', 'observaciones');
  }
};