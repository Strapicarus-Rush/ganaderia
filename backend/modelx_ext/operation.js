module.exports = (Sequelize, dbConnection) => {
    const Operation = dbConnection.define('operation', {
        name: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: false,
            defaultValue: 'Test operation.',
            unique: true
        },
        description: {
            type: Sequelize.STRING,
            field: 'description',
            allowNull: false,
            defaultValue: 'Test operation Description',
            unique: false
        },
        period_length: {
            type: Sequelize.STRING,
            field: 'period_length',
            allowNull: false,
            defaultValue: 'Test 2 weeks period.',
            unique: false
        },
        repeat: {
            type: Sequelize.BOOLEAN,
            field: 'repeat',
            allowNull: false,
            defaultValue: false,
            unique: false
        },
        period_start: {
            type: Sequelize.DATE,
            field: 'period_start',
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
            unique: false
        },
        period_end: {
            type: Sequelize.DATE,
            field: 'period_end',
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
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
                fields: ['repeat', 'period_start', 'period_end']
            }
        ],
        freezeTableName: true
    });

    Operation.sync().then(() => { });

    return Operation;
}

// export interface Operation {
//     id?:number;
//     name: string;
//     description?: string;
//     period_length?: number;
//     repeat: boolean;
//     period_start?: Date;
//     period_end?: Date;
//     createdAt:Date;
//     updatedAt:Date;
// }