module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {
    
    require('./routes')(router, Sequelize, dbConnection, Dictionary, authorizationCheck);

}