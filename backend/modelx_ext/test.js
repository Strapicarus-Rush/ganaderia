module.exports = (Sequelize, dbConnection) => {
	const Test = dbConnection.define('test_table', {
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa',
			allowNull: false,
            defaultValue: 1
		},
		id_compra: {
			type: Sequelize.INTEGER,
			field: 'compra',
			allowNull: false,
            defaultValue: 1
		}
	}, {
			freezeTableName: true
		});

		Test.sync().then(() => { });

	return Test;
}
