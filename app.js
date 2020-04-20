const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')))
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	// res.sendFile(path.join(__dirname,'views/index.html'));
	res.render('index', { title: 'Library', list: ['item 1', 'item 2', 'item 3'] });
});

app.listen(port, function () {
	debug(`server listening on port ${chalk.green(port)}`);
});