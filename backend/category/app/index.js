module.exports =  (router, Sequelize, dbConnection, Dictionary, authorizationCheck) => {

    const Category = require('./category')(Sequelize, dbConnection);
    
    require('./routes')(Category, router, Sequelize, dbConnection, Dictionary, authorizationCheck);


}