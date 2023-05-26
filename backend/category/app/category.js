module.exports = (Sequelize, dbConnection) => {
    const Category = dbConnection.define('category', {
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
            defaultValue: 'Test category.',
            unique: false
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
        paranoid: false,
indexes: [
            {
                unique: true,
                fields: ['id_company', 'name', 'deleted']
            }
        ],
        freezeTableName: true
    });

    Category.sync().then(() => {
        dbConnection.query('insert ignore into category set name="Test category", description = "This is a test category, only for testing this software." ')
    });

    return Category;
}


// export interface Category {
//     id?: number;
//     id_company: number
//     name: string;
//     description?: string;
//     createdAt:Date;
//     updatedAt:Date;
// }