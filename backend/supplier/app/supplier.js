module.exports = (Sequelize, dbConnection) => {
    const Supplier = dbConnection.define('supplier', {
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
            defaultValue: 'Test Supplier.',
            unique: false
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
                fields: ['id_company', 'name']
            }
        ],
        freezeTableName: true
    });

    Supplier.sync().then(() => { 
        dbConnection.query('insert ignore into supplier set name="Test Supplier", description = "This is a test Supplier, only for testing this software.", email= "test@email.com" ')
    });

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