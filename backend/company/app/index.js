module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Company = require('./company')(Sequelize, dbConnection);
    
    require('./routes')(Company, router, Sequelize, dbConnection, Dictionary, authorizationCheck);


}