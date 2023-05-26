module.exports = (Sequelize, dbConnection) => {
    const Grassland = dbConnection.define('grassland', {
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
            defaultValue: 'Test Grassland.',
            unique: false
        },
        description: {
            type: Sequelize.STRING,
            field: 'description',
            allowNull: false,
            defaultValue: 'Test Grassland description.',
            unique: false
        },
        id_prefered_breed: {
            type: Sequelize.INTEGER,
            field: 'id_prefered_breed',
            allowNull: true,
            defaultValue: 1,
            unique: false,
            references: {
                model: 'breed',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'restrict'
        },
        grass_type: {
            type: Sequelize.STRING,
            field: 'grass_type',
            allowNull: false,
            defaultValue: 'Test green grass.',
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
                fields: ['id_company','name','id_prefered_breed', 'grass_type']
            }
        ],
        freezeTableName: true
    });

    Grassland.sync().then(() => { });

    return Grassland;
}

// export interface Grassland {
//     id?: number;
//     name: string;
//     description?: string;
//     prefered_animal?: Race;
//     grass_type:string;
//     createdAt:Date;
//     updatedAt:Date;
// }