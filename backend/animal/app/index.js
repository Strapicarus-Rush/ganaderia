module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Animal = require('./animal')(Sequelize, dbConnection);
    
    require('./routes')(Animal, router, Sequelize, dbConnection, Dictionary, authorizationCheck);

}