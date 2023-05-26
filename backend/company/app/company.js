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
        address: {
            type: Sequelize.STRING,
            field: 'address',
            allowNull: false,
            defaultValue: 'Test Company address',
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

    Company.sync().then(() => {
        dbConnection.query('insert ignore into company set name="Test Company", description = "This is a test company, only for testing this software.", address= "Some street near some other street." ')
    });

    return Company;
}