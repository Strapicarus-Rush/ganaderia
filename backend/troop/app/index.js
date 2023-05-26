module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Troop = require('./troop')(Sequelize, dbConnection);
    
    require('./routes')(Troop, router, Sequelize, dbConnection, Dictionary, authorizationCheck);


}