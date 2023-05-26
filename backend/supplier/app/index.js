module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Supplier = require('./supplier')(Sequelize, dbConnection);
    
    require('./routes')(Supplier, router, Sequelize, dbConnection, Dictionary, authorizationCheck);


}