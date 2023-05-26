module.exports =  (router,  Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Breed = require('./breed')(Sequelize, dbConnection);
    
    require('./routes')(Breed, router, Sequelize, dbConnection, Dictionary, authorizationCheck);


}