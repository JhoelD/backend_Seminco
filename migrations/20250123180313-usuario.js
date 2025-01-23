'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      codigo_dni: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apellidos: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nombres: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cargo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      empresa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      guardia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      autorizado_equipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      correo: {  
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, 
        validate: {
          isEmail: {
            msg: 'Debe ingresar un correo electrónico válido.'
          }
        }
      },
      password: {  
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^(?=.*[a-zA-Z0-9@#$%^&+=]).{6,}$/, 
            msg: 'La contraseña debe tener al menos 6 caracteres, incluyendo letras, números y símbolos.'
          }
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    
    await queryInterface.addColumn('usuarios', 'codigo_dni', {
      type: Sequelize.STRING,
      allowNull: false
    }).catch(() => {}); 

    await queryInterface.addColumn('usuarios', 'apellidos', {
      type: Sequelize.STRING,
      allowNull: false
    }).catch(() => {});

    await queryInterface.addColumn('usuarios', 'nombres', {
      type: Sequelize.STRING,
      allowNull: false
    }).catch(() => {});

    await queryInterface.addColumn('usuarios', 'cargo', {
      type: Sequelize.STRING,
      allowNull: false
    }).catch(() => {});

    await queryInterface.addColumn('usuarios', 'empresa', {
      type: Sequelize.STRING,
      allowNull: false
    }).catch(() => {});

    await queryInterface.addColumn('usuarios', 'guardia', {
      type: Sequelize.STRING,
      allowNull: false
    }).catch(() => {});

    await queryInterface.addColumn('usuarios', 'autorizado_equipo', {
      type: Sequelize.STRING,
      allowNull: false
    }).catch(() => {});

    
    await queryInterface.addColumn('usuarios', 'correo', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Debe ingresar un correo electrónico válido.'
        }
      }
    }).catch(() => {});

    await queryInterface.addColumn('usuarios', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^(?=.*[a-zA-Z0-9@#$%^&+=]).{6,}$/, 
          msg: 'La contraseña debe tener al menos 6 caracteres, incluyendo letras, números y símbolos.'
        }
      }
    }).catch(() => {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.removeColumn('usuarios', 'codigo_dni');
    await queryInterface.removeColumn('usuarios', 'apellidos');
    await queryInterface.removeColumn('usuarios', 'nombres');
    await queryInterface.removeColumn('usuarios', 'cargo');
    await queryInterface.removeColumn('usuarios', 'empresa');
    await queryInterface.removeColumn('usuarios', 'guardia');
    await queryInterface.removeColumn('usuarios', 'autorizado_equipo');
    await queryInterface.removeColumn('usuarios', 'correo');
    await queryInterface.removeColumn('usuarios', 'password');
  }
};
