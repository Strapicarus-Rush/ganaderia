module.exports = (Sequelize, dbConnection, bcrypt, saltRounds) => {

    const User = dbConnection.define('user', {
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
        username: {
            type: Sequelize.STRING,
            field: 'username',
            allowNull: false,
            defaultValue: 'Anonymous',
            unique: true
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
            defaultValue: 'anonymous@anonymous.anonymous',
            unique: true
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
                fields: ['id_company', 'email', 'username']
            }
        ],
        freezeTableName: true
    });

   // for test purpose.
		// bcrypt.genSalt(saltRounds).then((salt)=>{
		// 	bcrypt.hash('123', salt).then((hash) => {
				User.sync().then(() => { 
					// dbConnection.query("insert ignore into user set username='pablo', password='"+hash+"', email='anonymous@anonymous.anonymous'" ).then((res) => {});
				});
		// 	});
		// });

    return User;
}
