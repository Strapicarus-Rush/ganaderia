module.exports = (Sequelize, dbConnection) => {
    const Category = dbConnection.define('category', {
        name: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: false,
            defaultValue: 'Test category.',
            unique: true
        },
        description: {
            type: Sequelize.STRING,
            field: 'description',
            allowNull: false,
            defaultValue: 'Test category Description',
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

    Category.sync().then(() => { });

    return Category;
}


// export interface Category {
//     id?: number;
//     name: string;
//     description?: string;
//     createdAt:Date;
//     updatedAt:Date;
// }