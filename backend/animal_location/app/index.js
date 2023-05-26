module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Animal_location = require('./animal_location')(Sequelize, dbConnection);
    
    require('./routes')(Animal_location, router, Sequelize, dbConnection, Dictionary, authorizationCheck);
    
}