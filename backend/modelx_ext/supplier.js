module.exports = (Sequelize, dbConnection) => {
    const Supplier = dbConnection.define('supplier', {
        name: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: false,
            defaultValue: 'Test Supplier.',
            unique: true
        },
        description: {
            type: Sequelize.STRING,
            field: 'description',
            allowNull: false,
            defaultValue: 'Test Supplier Description',
            unique: false
        },
        email: {
            type: Sequelize.STRING,
            field: 'email',
            allowNull: false,
            defaultValue: 'Test@Supplier email',
            unique: true
        },
        phone:{
            type: Sequelize.INTEGER,
            field: 'phone',
            allowNull: false,
            defaultValue: 0,
            unique: true
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
                fields: ['name', 'email', 'phone']
            }
        ],
        freezeTableName: true
    });

    Supplier.sync().then(() => { });

    return Supplier;
}



// export interface Supplier {
//     id?: number;
//     name: string;
//     description?:string;
//     observation?:string;
//     createdAt:Date;
//     updatedAt:Date;
// }