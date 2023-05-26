module.exports = (Sequelize, dbConnection) => {
    const Troop = dbConnection.define('troop_animal', {
        id_animal: {
            type: Sequelize.INTEGER,
            field: 'id_animal',
            allowNull: true,
            defaultValue: 1,
            unique: false,
            references: {
                model: 'animal',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'restrict'
        },
        id_troop: {
            type: Sequelize.INTEGER,
            field: 'id_troop',
            allowNull: false,
            defaultValue: 1,
            references: {
                model: 'troop',
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
                fields: ['troop', 'animal']
            }
        ],
        freezeTableName: true
    });

    Troop.sync().then(() => { });

    return Troop;
}