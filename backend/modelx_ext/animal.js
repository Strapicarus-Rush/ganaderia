module.exports = (Sequelize, dbConnection) => {
    const Animal = dbConnection.define('animal', {
        id_company: {
            type: Sequelize.INTEGER,
            field: 'id_company',
            allowNull: true,
            defaultValue: 1,
            unique: false,
            references: {
                model: 'Company',
                key: 'id'
              },
              onUpdate: 'cascade',
              onDelete: 'restrict'
        },
        sex: {
            type: Sequelize.BOOLEAN,
            field: 'sex',
            allowNull: false,
            defaultValue: false
        },
        ident: {
            type: Sequelize.STRING,
            field: 'indent',
            allowNull: false,
            defaultValue: '0',
            unique: true
        },
        breed: {
            type: Sequelize.INTEGER,
            field: 'breed',
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
        birthdate: {
            type: Sequelize.DATE,
            field: 'birthdate',
            allowNull: false,
            defaultValue: Sequelize.fn('now')
        },
        category: {
            type: Sequelize.INTEGER,
            field: 'category',
            allowNull: true,
            defaultValue: 1,
            references: {
                model: 'Category',
                key: 'id'
              },
              onUpdate: 'cascade',
              onDelete: 'restrict'
        }, 
        supplier: {
            type: Sequelize.INTEGER,
            field: 'supplier',
            allowNull: true,
            defaultValue: 1,
            references: {
                model: 'Supplier',
                key: 'id'
              },
              onUpdate: 'cascade',
              onDelete: 'restrict'
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

    Animal.sync().then(() => { });

    return Animal;
}


// export interface Animal {
//     id?: string;
//     sex: Sex;
//     ident: string;
//     birth?: Date;
//     race: Race;
//     category: Category;
//     locations?: Animal_location[];
//     weights?: Weight[];
//     supplier: Supplier;
//     offspring?: Animal[];
//     createdAt:Date;
//     updatedAt:Date;
// }