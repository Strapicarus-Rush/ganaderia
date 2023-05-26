module.exports = (Sequelize, dbConnection) => {
    const Troop_location = dbConnection.define('troop_location', {
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
            unique: false,
            references: {
                model: 'corral',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'restrict'
        },
        id_troop: {
            type: Sequelize.INTEGER,
            field: 'id_troop',
            allowNull: true,
            defaultValue: 1,
            unique: false,
            references: {
                model: 'troop',
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
                fields: ['id_company','id_corral', 'id_troop', 'id_grassland']
            }
        ],
        freezeTableName: true
    });

    Troop_location.sync().then(() => { });

    return Troop_location;
}


// export interface Weight {
//     id?: number;
//     name?: string;
//     troop: Troop;
//     animal: Animal;
//     corral?: Corral;
//     grassland?: Grassland;
//     createdAt:Date;
//     updatedAt:Date;
// }