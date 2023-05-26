module.exports = (Sequelize, dbConnection) => {
    const Labor = dbConnection.define('labor', {
        id_company: {
            type: Sequelize.INTEGER,
            field: 'id_company',
            allowNull: true,
            defaultValue: 1,
            unique: false,
            references: {
                model: 'company',
                key: 'id'
              },
              onUpdate: 'cascade',
              onDelete: 'restrict'
        },
        name: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: false,
            defaultValue: 'Test Labor.',
            unique: false
        },
        description: {
            type: Sequelize.STRING,
            field: 'description',
            allowNull: false,
            defaultValue: 'Test Grassland description.',
            unique: false
        },
        id_corral: {
            type: Sequelize.INTEGER,
            field: 'id_corral',
            allowNull: true,
            defaultValue: 1,
            unique: false,
            references: {
                model: 'corral',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'restrict'
        },
        id_grassland: {
            type: Sequelize.INTEGER,
            field: 'id_grassland',
            allowNull: true,
            defaultValue: 1,
            unique: false,
            references: {
                model: 'grassland',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'restrict'
        },
        id_animal: {
            type: Sequelize.INTEGER,
            field: 'id_animal',
            allowNull: true,
            defaultValue: 1,
            unique: false,
            references: {
                model: 'animal',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'restrict'
        },
        date: {
            type: Sequelize.DATE,
            field: 'date',
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
            unique: false
        },
        id_operation: {
            type: Sequelize.INTEGER,
            field: 'id_operation',
            allowNull: true,
            defaultValue: 1,
            unique: false,
            references: {
                model: 'operation',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'restrict'
        },
        completed: {
            type: Sequelize.BOOLEAN,
            field: 'completed',
            allowNull: false,
            defaultValue: false
        },
                deleted: {
            type: Sequelize.BOOLEAN,
            field: 'deleted',
            allowNull: false,
            defaultValue: false
        }
    }, {
        paranoid: false,
indexes: [
            {
                name: 'labor_unique_index',
                unique: true,
                fields: ['id_company', 'name', 'id_animal', 'id_corral', 'date', 'id_operation', 'deleted']
            }
        ],
        freezeTableName: true
    });

    Labor.sync().then(() => { });

    return Labor;
}





// export interface Labor {
//     id?: number;
//     corral?: Corral;
//     grassland?: Grassland;
//     animal?: Animal;
//     description: string;
//     createdAt:Date;
//     updatedAt:Date;
// }