module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Weight = require('./weight')(Sequelize, dbConnection);
    
    require('./routes')(Weight, router, Sequelize, dbConnection, Dictionary, authorizationCheck);


}