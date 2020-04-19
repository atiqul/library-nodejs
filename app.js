const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public')));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname,'views/index.html'));
});

app.listen(port, function(){
	debug(`server listening on port ${chalk.green(port)}`);
});