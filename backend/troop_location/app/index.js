module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Troop_location = require('./troop_location')(Sequelize, dbConnection);
    
    require('./routes')(Troop_location, router, Sequelize, dbConnection, Dictionary, authorizationCheck);


}