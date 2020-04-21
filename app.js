const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();
const authorRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')))
app.set('views', './src/views');
app.set('view engine', 'ejs');

bookRouter.route('/books')
	.get((req, res)=>{
		res.send("Hello books")
	});

bookRouter.route('/books/single')
	.get((req, res)=>{
		res.send("Hello single book")
	})

authorRouter.route('/authors')
	.get((req, res)=>{
		res.send("Hello authors");
	})

app.use('/', bookRouter, authorRouter);
app.get('/', function (req, res) {
	// res.sendFile(path.join(__dirname,'views/index.html'));
	res.render(
		'index', 
		{ 
			title: 'Library', 
			nav: [{link:'books', title:'Books'},
			{link:'authors', title: 'Authors'}] 
		}
	);
});


app.listen(port, function () {
	debug(`server listening on port ${chalk.green(port)}`);
});