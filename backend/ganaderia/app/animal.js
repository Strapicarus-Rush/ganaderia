module.exports = (Sequelize, dbConnection) => {
    const Animal = dbConnection.define('animal', {
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
        sex: {
            type: Sequelize.BOOLEAN,
            field: 'sex',
            allowNull: false,
            defaultValue: false
        },
        ident: {
            type: Sequelize.STRING,
            field: 'ident',
            allowNull: false,
            defaultValue: '0',
            unique: false
        },
        id_breed: {
            type: Sequelize.INTEGER,
            field: 'id_breed',
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
        birthdate: {
            type: Sequelize.DATE,
            field: 'birthdate',
            allowNull: false,
            defaultValue: Sequelize.fn('now')
        },
        id_category: {
            type: Sequelize.INTEGER,
            field: 'id_category',
            allowNull: true,
            defaultValue: 1,
            references: {
                model: 'category',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'restrict'
        },
        id_supplier: {
            type: Sequelize.INTEGER,
            field: 'id_supplier',
            allowNull: true,
            defaultValue: 1,
            references: {
                model: 'supplier',
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
        paranoid: false,
        indexes: [
            {
                unique: true,
                fields: ['id_company', 'ident']
            }
        ],
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