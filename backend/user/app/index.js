module.exports =  (router, jwt, Sequelize, dbConnection, bcrypt, saltRounds, Dictionary, secret, authorizationCheck) => {

    const User = require('./user')(Sequelize, dbConnection, bcrypt, saltRounds);
    
    require('./routes')(User, router, jwt, Sequelize, dbConnection, bcrypt, saltRounds, Dictionary, secret, authorizationCheck);

}