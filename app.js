var express = require('express');
var app = module.exports = express();
var http = require('http');
var mysql = require('mysql');
var connection  = require('express-myconnection');

/*----------------------------------
    Setup main environments
------------------------------------*/
app.set('port',process.env.PORT || 2200);
app.use(express.logger('dev'));

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306,
        database:'nodejs' 

    },'request')

);

/*-----------------------------------
    Set routes and middleware
-----------------------------------*/

var login = require('./lib/login');
var signup = require('./lib/signup');
var users = require('./lib/users');

app.use(express.json());
app.use(express.urlencoded());
app.use(login);
app.use(signup);
app.use(users);

app.use(app.router);

/*Create server*/
http.createServer(app).listen(app.get('port'),function(){

    console.log('Listening port : %s ', app.get('port'));
});
