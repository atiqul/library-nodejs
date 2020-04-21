const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql/msnodesqlv8');

const app = express();
const port = process.env.PORT || 3000;
const nav = [
	{ link: '/books', title: 'Books' },
	{ link: '/authors', title: 'Authors' }
];

const config = {
	server: 'localhost\\SQLEXPRESS', // You can use 'localhost\\instance' to connect to named instance
	database: 'LIBRARY_NODE_TEST',
	options: {
		trustedConnection: true
	}
};

sql.connect(config).catch(err => debug(err));

const bookRouter = require('./src/routes/bookRoutes')(nav);
const authorRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')))
app.set('views', './src/views');
app.set('view engine', 'ejs');


authorRouter.route('/authors')
	.get((req, res) => {
		res.send("Hello authors");
	})

app.use('/', authorRouter, bookRouter);
app.get('/', function (req, res) {
	// res.sendFile(path.join(__dirname,'views/index.html'));
	res.render(
		'index',
		{
			title: 'Library',
			nav: [{ link: 'books', title: 'Books' },
			{ link: 'authors', title: 'Authors' }]
		}
	);
});


app.listen(port, function () {
	debug(`server listening on port ${chalk.green(port)}`);
});