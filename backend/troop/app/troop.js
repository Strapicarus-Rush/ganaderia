module.exports = (Sequelize, dbConnection) => {
    const Troop = dbConnection.define('troop', {
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
        paranoid: false,
indexes: [
            {
                unique: true,
                fields: ['id_company', 'name', 'deleted']
            }
        ],
        freezeTableName: true
    });

    Troop.sync().then(() => { 
        dbConnection.query('insert ignore into troop set name="Test troop", description = "This is a test troop, only for testing this software."')
    });

    return Troop;
}


// export interface Troop {
//     id?: number;
//     name: string;
//     description?: string;
//     createdAt:Date;
//     updatedAt:Date;
// }