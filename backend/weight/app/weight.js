
module.exports = (Sequelize, dbConnection) => {
    const Weight = dbConnection.define('weight', {
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
        date: {
            type: Sequelize.DATE,
            field: 'date',
            allowNull: true,
            defaultValue: Sequelize.fn('now'),
            unique: false
        },
        weight: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'date',
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
                name: 'weight_index',
                unique: true,
                fields: ['id_company', 'id_animal', 'date', 'deleted']
            }
        ],
        freezeTableName: true
    });

    Weight.sync().then(() => { });

    return Weight;
}

// export interface Weight {
//     id?: number;
//     animal: Animal;
//     date: Date;
//     weight: number;
//     createdAt:Date;
//     updatedAt:Date;
// }