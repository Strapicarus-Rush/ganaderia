const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "5mb", parameterLimit: 500 }));

function getRoute(req) {
  return `${req.hostname}${req.originalUrl}`
}

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`${req.method} ${getRoute(req)} ${res.statusCode}`)
  })
  next()
});

app.use('/cdn', express.static(path.join(__dirname,'content')));

app.get('/', (req, res) => {
  res.status(200).json({message:'Content delivery network.'});
});


http.listen(5050)