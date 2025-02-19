'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('formato_plan_mineral', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            mina: {  
                type: Sequelize.STRING,
                allowNull: false
            },
            zona: {  
                type: Sequelize.STRING,
                allowNull: false
            },
            estructura: {  
                type: Sequelize.STRING,
                allowNull: false
            },
            tipo_material: {  
                type: Sequelize.STRING,
                allowNull: false
            },
            nivel: {  
                type: Sequelize.STRING,
                allowNull: false
            },
            block: {  
                type: Sequelize.STRING,
                allowNull: false
            },
            labor: {  
                type: Sequelize.STRING,
                allowNull: false
            },
            metodo_minado: {  
                type: Sequelize.STRING,
                allowNull: false
            },
            metros: {  
                type: Sequelize.FLOAT,
                allowNull: false
            },
            densidad: {  
                type: Sequelize.FLOAT,
                allowNull: false
            },
            toneladas: {  
                type: Sequelize.FLOAT,
                allowNull: false
            },
            ag: {  
                type: Sequelize.FLOAT,
                allowNull: false
            },
            au: {  
                type: Sequelize.FLOAT,
                allowNull: false
            },
            pb: {  
                type: Sequelize.FLOAT,
                allowNull: false
            },
            zn: {  
                type: Sequelize.FLOAT,
                allowNull: false
            },
            cu: {  
                type: Sequelize.FLOAT,
                allowNull: false
            },
            vpt: {  
                type: Sequelize.FLOAT,
                allowNull: false
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
    },

    async down(queryInterface) {
        await queryInterface.dropTable('formato_plan_mineral');
    }
};
