var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var port = 8080;
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Forlder === tous les fichiers angularJS 2 seront dans le dossier client
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Les routes coté serveur
app.use('/', index);
app.use('/api', tasks); // pour intéragir avec l'API Task

app.listen(port, function () {
    console.log("Go go power ranger !! sur le port " + port);
});
