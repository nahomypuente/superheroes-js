require('dotenv').config();
require('./db').default;
const http = require('http');
const express = require('express');
const md5 = require('md5');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDocument = require('./swagger.json');

const fetch = require('node-fetch');
const url = require('url');
const { response } = require('express');
const routes = require('./routes');

const app = express();

const router = express.Router();

const baseUrl = 'https://gateway.marvel.com';
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const port = 3000;

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

const userLocation = (url1, url2) => {
  let url = new URL(url1 + url2);
  let public_key = PUBLIC_KEY;
  let private_key = PRIVATE_KEY;
  let ts = new Date().getTime();
  let stringToHash = ts + private_key + public_key;
  let hash = md5(stringToHash);
  let newUrl = url + 'ts=' + ts + '&apikey=' + public_key + '&hash=' + hash;

  return newUrl;
};

const detailsData = (super_data) => {
  const response_data = super_data.map(element => {
    const profile = {};
    profile.id = element.id;
    profile.name = element.name;
    profile.description = element.description;
    profile.image = element.thumbnail.path;
    return profile;
  })
  return response_data;
};

app.get('/', (req, res) => {
  res.send('Working');
})

app.get('/api/characters', (req, res) => {

  const query = url.parse(req.url,true).search;
  let apiUrl = '';

  if (query) {
    apiUrl = userLocation(baseUrl, '/v1/public/characters' + query + '&');
  } else {
    apiUrl = userLocation(baseUrl, '/v1/public/characters');
  } 
  console.log(apiUrl)
  fetch(apiUrl)
  .then( response => response.json())
  .then( data => {
    if (data.code == 200) {
      const super_data = data.data.results;
      const response_data = detailsData(super_data);
      res.send(response_data);
    } else {
      res.send(data);
    }
      
  })
  .catch( error => {
    console.log(error);
  })

});

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;