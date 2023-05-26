module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Operation = require('./operation')(Sequelize, dbConnection);
    
    require('./routes')(Operation, router, Sequelize, dbConnection, Dictionary, authorizationCheck);


}