module.exports = (Sequelize, dbConnection) => {
    const Grazing = dbConnection.define('grazing', {
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
        date: {
            type: Sequelize.DATE,
            field: 'date',
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
            unique: false
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
                fields: ['grassland', 'animal', 'corral']
            }
        ],
        freezeTableName: true
    });

    Grazing.sync().then(() => { });

    return Grazing;
}
// export interface Grazing {
//     id?: number;
//     grassland?: Grassland;
//     animal: Animal;
//     date: Date;
//     corral?: Corral;
//     createdAt:Date;
//     updatedAt:Date;
// }