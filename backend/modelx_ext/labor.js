module.exports = (Sequelize, dbConnection) => {
    const Labor = dbConnection.define('labor', {
        name: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: false,
            defaultValue: 'Test Labor.',
            unique: true
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
            type: Sequelize.STRING,
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
                unique: true,
                fields: ['grassland', 'animal', 'corral', 'date', 'operation']
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