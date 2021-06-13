import express from 'express';
import http from 'http';
import config from 'config';

async function startServer () {
  const app = express();
  await require('./loaders').appLoader({ app });
  const server = http.createServer(app);
  await require('./loaders').serverLoader({ server });

  server.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`);
  }).on('error', err => {
    process.once('SIGUSR2', function () {
      process.kill(process.pid, 'SIGUSR2');
    });

    process.on('SIGINT', function () {
      process.kill(process.pid, 'SIGINT');
    });
    console.error(err);
    process.exit(1);
  });
}

startServer();
