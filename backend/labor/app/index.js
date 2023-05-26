module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Labor = require('./labor')(Sequelize, dbConnection);
    
    require('./routes')(Labor, router, Sequelize, dbConnection, Dictionary, authorizationCheck);


}