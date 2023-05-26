module.exports = (Sequelize, dbConnection) => {
    const Breed = dbConnection.define('breed', {
        name: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: false,
            defaultValue: 'Test Breed.',
            unique: true
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
        freezeTableName: true
    });

    Breed.sync().then(() => { });

    return Breed;
}


// export interface Race{
//     id?:number;
//     name:string;
//     description?: string;
//     createdAt:Date;
//     updatedAt:Date;
// }
