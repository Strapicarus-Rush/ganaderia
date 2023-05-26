module.exports = (Sequelize, dbConnection) => {
    const Troop = dbConnection.define('troop', {
        name: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: false,
            defaultValue: 'Test Troop.',
            unique: true
        },
        description: {
            type: Sequelize.STRING,
            field: 'description',
            allowNull: false,
            defaultValue: 'Test Troop Description',
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

    Troop.sync().then(() => { });

    return Troop;
}


// export interface Troop {
//     id?: number;
//     name: string;
//     description?: string;
//     createdAt:Date;
//     updatedAt:Date;
// }