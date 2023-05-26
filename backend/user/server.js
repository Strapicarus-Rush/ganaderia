const {readFileSync} = require('fs')
const Dictionary = require('./app/dictionary')();
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize')
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const http = require('http').Server(app);
const cors = require('cors');
const saltRounds = +process.env.saltRounds;
const DBNAME = process.env.DBNAME;
const DBUSR = process.env.DBUSR;
const DBPSS = process.env.DBPSS;
const srvport = +process.env.SRVPORT;
const secret = readFileSync(__dirname+'/priv.key');
const staticpath = process.env.PUBLIC;
const dbhost = process.env.DBHOST;
const indexpath = process.env.INDEX;

const dbConnection = new Sequelize(DBNAME, DBUSR, DBPSS, {
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

app.use('/user', router);

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
                next()
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

require('./app')(router, jwt, Sequelize, dbConnection, bcrypt, saltRounds, Dictionary, secret, authorizationCheck)
router.get('/',  (req, res) => {
    res.status(200).json({  message: 'User Api. Agil Ganaderia.' });
});


app.get('/', (req, res) => {
    res.sendFile(indexpath);
});


http.listen(8080);//srvport);
console.log('listening on port', 8080);//srvport);