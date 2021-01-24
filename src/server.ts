import express = require('express');
import 'reflect-metadata';
import './db/database'

const app = express()

function loggerMiddleware(request: express.Request, response: express.Response, next: any) {
  response;
  console.log(`${request.method} ${request.path}`);
  next();
}

export const router = express.Router({
  caseSensitive: true
});

router.get('/', (request, response) => {
  request;
  response.sendFile('./website/public/index.html', { root: __dirname });
});

app.use(loggerMiddleware);

app.use('/', router);

// set static folder
app.use(express.static(__dirname + "/website/public"));


app.listen(5000);

import './weatherService'