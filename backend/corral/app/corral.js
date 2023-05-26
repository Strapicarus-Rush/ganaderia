module.exports = (Sequelize, dbConnection) => {
    const Corral = dbConnection.define('corral', {
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
            defaultValue: 'Test corral.',
            unique: false
        },
        coordinates: {
            type: Sequelize.STRING,
            field: 'coordinates',
            allowNull: false,
            defaultValue: '0',
            unique: false
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
                fields: ['id_company','name','coordinates']
            }
        ],
        freezeTableName: true
    });

    Corral.sync().then(() => { });

    return Corral;
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