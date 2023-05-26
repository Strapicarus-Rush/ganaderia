module.exports = (Sequelize, dbConnection, bcrypt, saltRounds, password) => {

	const User = dbConnection.define('users', {
		id_company: {
			type: Sequelize.INTEGER,
			field: 'id_company',
			allowNull: true,
            defaultValue: 0
		},
		username: {
			type: Sequelize.STRING,
			field: 'username',
			allowNull: false,
            defaultValue: 'Anonymous',
			unique:true
		},
        password: {
			type: Sequelize.STRING,
			field: 'password',
			allowNull: false,
            defaultValue: '$2b$10$fS9h5Uae3me8n/VxDmLVfu7F1/eEmLnlNrjDC.Vv9bEVsUR66TrHy'
		},
        email: {
			type: Sequelize.STRING,
			field: 'email',
			allowNull: false,
            defaultValue: 'Anonymous',
			unique:true
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

		// for test purpose.
		bcrypt.genSalt(saltRounds).then((salt)=>{
			bcrypt.hash(password, salt).then((hash) => {
				User.sync().then(() => { 
					dbConnection.query("insert ignore into users set id=1, username='test', password='"+hash+"'").then((res) => {});
				});
			});
		});
		
	return User;
}
