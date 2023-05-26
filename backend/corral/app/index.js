module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Corral = require('./corral')(Sequelize, dbConnection);
    
    require('./routes')(Corral, router, Sequelize, dbConnection, Dictionary, authorizationCheck);


}