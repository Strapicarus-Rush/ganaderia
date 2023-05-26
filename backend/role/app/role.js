module.exports = (Sequelize, dbConnection) => {

	const Role = dbConnection.define('role', {
		name: {
			type: Sequelize.STRING,
			field: 'name',
			allowNull: false,
			defaultValue: 'Anonymous',
			unique: false
		},
		description: {
			type: Sequelize.STRING,
			field: 'description',
			allowNull: false,
			defaultValue: 'A description'
		},
		deleted: {
			type: Sequelize.BOOLEAN,
			field: 'deleted',
			allowNull: false,
			defaultValue: false
		}
	}, {
		indexes: [
			{
				unique: true,
				fields: ['name', 'deleted']
			}
		],
		freezeTableName: true
	});

	Role.sync().then(() => {
		dbConnection.query('insert ignore into role set name="Test Role", description = "This is a test Role." ')
	});

	return Role;
}
