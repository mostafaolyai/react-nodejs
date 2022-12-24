const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet')

const feedRoutes = require('./routes/feed');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(helmet())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);
mongoose
  .connect(
    'mongodb://localhost:27017'
  )
  .then(result => {
    const server = app.listen(8080);

    const io = require('./socket').init(server);
    io.on('connection', socket => {
      console.log('Client connected!')//we don't see it tuntill front connected
    })
  })
  .catch(err => console.log(err));
