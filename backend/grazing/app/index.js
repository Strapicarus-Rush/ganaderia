module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Grazing = require('./grazing')(Sequelize, dbConnection);
    
    require('./routes')(Grazing, router, Sequelize, dbConnection, Dictionary, authorizationCheck);


}