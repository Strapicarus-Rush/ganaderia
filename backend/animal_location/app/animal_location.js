
module.exports = (Sequelize, dbConnection) => {
    const AnimalLocation = dbConnection.define('animal_location', {
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
        id_corral: {
            type: Sequelize.INTEGER,
            field: 'id_corral',
            allowNull: true,
            defaultValue: 1,
            references: {
                model: 'corral',
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
            defaultValue: Sequelize.fn('now')
        },
        id_operation: {
            type: Sequelize.INTEGER,
            field: 'id_operation',
            allowNull: true,
            defaultValue: 1,
            references: {
                model: 'operation',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'restrict'
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
                name: 'unique_index_animal_location',
                unique: true,
                fields: ['id_company', 'id_corral', 'id_animal', 'id_operation', 'date', 'deleted']
            }
        ],
        freezeTableName: true
    });

    AnimalLocation.sync().then(() => { });

    return AnimalLocation;
}


// export interface Animal_location {
//     id?: number;
//     corral: Corral;
//     animal: Animal;
//     date: Date;
//     operation?: Operation;
//     createdAt:Date;
//     updatedAt:Date;
// }