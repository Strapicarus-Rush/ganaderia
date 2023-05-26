module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Breteado = require('./breteado')(Sequelize, dbConnection);
    
    require('./routes')(Breteado, router, Sequelize, dbConnection, Dictionary, authorizationCheck);


}