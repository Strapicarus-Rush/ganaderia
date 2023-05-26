const Dictionary = require('./app/dictionary')();
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize')
const app = express();
const jwt = require('jsonwebtoken');
const http = require('http').Server(app);
const cors = require('cors');
const db = process.env.DBNAME;
const dbusr = process.env.DBUSR;
const dbpss = process.env.DBPSS;
const srvport = +process.env.SRVPORT;
const secret = process.env.JWTSECRET;
const staticpath = process.env.PUBLIC;
const dbhost = process.env.DBHOST;
const indexpath = process.env.INDEX;

const dbConnection = new Sequelize(db, dbusr, dbpss, {
    host: dbhost, //'localhost',
//port:'3360',
    dialect: 'mysql',
    timezone: "-04:00",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "5mb", parameterLimit: 500 }));

app.use('/grazing', router);

function getRoute(req) {
    return `${req.hostname}${req.originalUrl}` 
  }
  
  app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`${req.method} ${getRoute(req)} ${res.statusCode}`) 
    })
    next();
  });

  const authorizationCheck =  (req, res, next) => {
    if (req.headers["authorization"]) {
      const bearerHeader = req.headers["authorization"];
      try {
        const decodeInfo = jwt.verify(bearerHeader.split(' ')[1], secret);
        if (decodeInfo) {
          dbConnection.query('select token from sys_usuario where id = ' + decodeInfo.id, { type: dbConnection.QueryTypes.SELECT })
            .then(function (usuario) {
              if (usuario.id > 0) {
                next();
              } else {
                return res.status(403).send({ message: 'Token invalido.', hasErr: true })
              }
            }).catch(function (err) {
              return res.status(403).send({ message: 'Token invalido.', hasErr: true })
            })
        } else {
          return res.status(403).send({ message: 'Token invalido.', hasErr: true })
        }
      } catch (error) {
        return res.status(403).send({ message: 'Token invalido.', hasErr: true })
      }
    } else {
      return res.status(403).send({ message: 'Token invalido. ', hasErr:true })
    }
  }

app.use('/', express.static(staticpath));

require('./app')(router, Sequelize, dbConnection, Dictionary, authorizationCheck)
router.get('/',  (req, res) => {
    res.status(200).json({  message: 'Grazing Api. Agil Ganaderia.' });
});


app.get('/', (req, res) => {
    res.sendFile(indexpath);
});


http.listen(srvport)
console.log('listening on port', srvport)