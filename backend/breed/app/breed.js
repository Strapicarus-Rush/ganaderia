module.exports = (Sequelize, dbConnection) => {
    const Breed = dbConnection.define('breed', {
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
            defaultValue: 'Test Breed.',
            unique: false
        },
        description: {
            type: Sequelize.STRING,
            field: 'description',
            allowNull: false,
            defaultValue: 'Test Breed Description',
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
                fields: ['id_company', 'name', 'deleted']
            }
        ],
        freezeTableName: true
    });

    Breed.sync().then(() => {
        dbConnection.query('insert ignore into breed set name="Test Breed", description = "This is a test breed, only for testing this software." ')
    });

    return Breed;
}


// export interface Race{
//     id?:number;
//     id_company: number;
//     name:string;
//     description?: string;
//     createdAt:Date;
//     updatedAt:Date;
// }
