module.exports = (Sequelize, dbConnection) => {
    const Grassland = dbConnection.define('grassland', {
        name: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: false,
            defaultValue: 'Test Grassland.',
            unique: true
        },
        description: {
            type: Sequelize.STRING,
            field: 'description',
            allowNull: false,
            defaultValue: 'Test Grassland description.',
            unique: false
        },
        prefered_breed: {
            type: Sequelize.INTEGER,
            field: 'prefered_breed',
            allowNull: true,
            defaultValue: 1,
            unique: false,
            references: {
                model: 'Breed',
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
                fields: ['prefered_breed', 'grass_type']
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