'use strict';

const Hapi = require('hapi');
const Path = require('path');
const AuthBearer = require('hapi-auth-bearer-token');
const Inert = require('inert');
const CONFIG = require('./config');

const server = Hapi.server({
  port: CONFIG.port,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'], // an array of origins or 'ignore'
      headers: ['Authorization'], // an array of strings - 'Access-Control-Allow-Headers' 
      exposedHeaders: ['Accept'], // an array of exposed headers - 'Access-Control-Expose-Headers',
      additionalExposedHeaders: ['Accept'], // an array of additional exposed headers
      maxAge: 60,
      credentials: true // boolean - 'Access-Control-Allow-Credentials'
  },
      files: {
          relativeTo: Path.join(__dirname, 'public')
      }
  }
});

const init = async () => {
  await server.register(AuthBearer);
  await server.register(Inert);

  require('./auth')(server, CONFIG);
  require('./routes/snacks')(server, CONFIG);
  require('./routes/images')(server, CONFIG);

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();