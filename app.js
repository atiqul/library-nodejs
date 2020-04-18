var express = require('express');

var app = express();

app.get('/', function(req, res){
    res.send('Hello world from library!!!')
});

app.listen(3000, function(){
    console.log('server listening on 3000.....')
})