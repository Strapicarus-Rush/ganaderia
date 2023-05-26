module.exports = (Sequelize, dbConnection) => {
    const Troop_Animal = dbConnection.define('troop_animal', {
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
                fields: ['id_company','id_troop', 'id_animal', 'deleted']
            }
        ],
        freezeTableName: true
    });

    Troop_Animal.sync().then(() => { });

    return Troop_Animal;
}