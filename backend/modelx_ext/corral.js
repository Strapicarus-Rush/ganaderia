module.exports = (Sequelize, dbConnection) => {
    const Corral = dbConnection.define('corral', {
        name: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: false,
            defaultValue: 'Test corral.',
            unique: true
        },
        coordinates: {
            type: Sequelize.STRING,
            field: 'coordinates',
            allowNull: false,
            defaultValue: '0',
            unique: true
        },
        dimentions: {
            type: Sequelize.STRING,
            field: 'dimentions',
            allowNull: false,
            defaultValue: '10x10m',
            unique: false
        },
        left: {
            type: Sequelize.INTEGER,
            field: 'left',
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
        right: {
            type: Sequelize.INTEGER,
            field: 'right',
            allowNull: true,
            defaultValue: 2,
            unique: false,
            references: {
                model: 'corral',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'restrict'
        },
        observation: {
            type: Sequelize.STRING,
            field: 'observation',
            allowNull: false,
            defaultValue: 'No observations',
            unique: false
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
                fields: ['coordinates', 'dimentions']
            }
        ],
        freezeTableName: true
    });

    corral.sync().then(() => { });

    return corral;
}


// export interface Corral {
//     id?: number;
//     name: string;
//     coordinates?: string;
//     dimentions?: string;
//     left?: Corral;
//     right?: Corral;
//     observation?: string;
//     createdAt:Date;
//     updatedAt:Date;
// }