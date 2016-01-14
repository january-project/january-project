var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var unless = require('express-unless');

var config = require('./config');
var authRoutes = require('./routes/authRoutes');
var nationRoutes = require('./routes/nationRoutes');
var userRoutes = require('./routes/userRoutes');

var port = process.env.PORT || 5000;
mongoose.connect(config.database);

app.use(function (req, res, next) {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
        if (req.method === 'OPTIONS') return res.sendStatus(200);
    }
    next();
});

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', expressJwt({ secret: config.secret }));
app.use('/api/nation', nationRoutes);
app.use('/auth', authRoutes);
app.use('/api/user', userRoutes);


app.listen(port, function () {
    console.log('Reached Port ' + port);
});
