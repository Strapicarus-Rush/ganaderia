module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Troop_animal = require('./troop_animal')(Sequelize, dbConnection);
    
    require('./routes')(Troop_animal, router, Sequelize, dbConnection, Dictionary, authorizationCheck);


}