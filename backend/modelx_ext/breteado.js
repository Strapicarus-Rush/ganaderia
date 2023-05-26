module.exports = (Sequelize, dbConnection) => {
    const Breteado = dbConnection.define('breteado', {
        id_animal: {
            type: Sequelize.INTEGER,
            field: 'id_animal',
            allowNull: true,
            defaultValue: 1,
            references: {
                model: 'animal',
                key: 'id'
              },
              onUpdate: 'cascade',
              onDelete: 'restrict'
        },
        id_operation: {
            type: Sequelize.INTEGER,
            field: 'id_operation',
            allowNull: true,
            defaultValue: 1,
            references: {
                model: 'operation',
                key: 'id'
              },
              onUpdate: 'cascade',
              onDelete: 'restrict'
        },
        date: {
            type: Sequelize.DATE,
            field: 'date',
            allowNull: false,
            defaultValue: Sequelize.fn('now')
        },
        period: {
            type: Sequelize.STRING,
            field: 'period',
            allowNull: false,
            defaultValue: '1 day',
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
                fields: ['animal', 'operation', 'date']
            }
        ],
        freezeTableName: true
    });

    Breteado.sync().then(() => { });

    return Breteado;
}


// Breteado {
//     id?: number;
//     animal: Animal;
//     operation: Operation;
//     date: Date;
//     period?: string;
//     createdAt:Date;
//     updatedAt:Date;
// }