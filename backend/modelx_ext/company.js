module.exports = (Sequelize, dbConnection) => {
    const Company = dbConnection.define('company', {
        name: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: false,
            defaultValue: 'Test Company.',
            unique: true
        },
        description: {
            type: Sequelize.STRING,
            field: 'description',
            allowNull: false,
            defaultValue: 'Test Company Description',
            unique: false
        },
        direction: {
            type: Sequelize.STRING,
            field: 'direction',
            allowNull: false,
            defaultValue: 'Test Company Direction',
            unique: true
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

    Company.sync().then(() => { });

    return Company;
}