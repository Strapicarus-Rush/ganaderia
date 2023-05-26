module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Grassland = require('./grassland')(Sequelize, dbConnection);
    
    require('./routes')(Grassland, router, Sequelize, dbConnection, Dictionary, authorizationCheck);


}