module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Role = require('./role')(Sequelize, dbConnection);
    
    require('./routes')(Role, router, Sequelize, dbConnection, Dictionary, authorizationCheck);


}