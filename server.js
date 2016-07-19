var serve = require('koa-static');
var koa = require('koa');
var app = koa();
var fs = require('fs');
var http = require('http');
var https = require('https');
var enforceHttps = require('koa-sslify');

app.use(enforceHttps());
app.use(serve('js'));
app.use(serve('demo'));
app.use(serve('.'));

var options = {
    key: fs.readFileSync('ssl/ssl.key'),
    cert: fs.readFileSync('ssl/ssl.crt')
};

https.createServer(options, app.callback()).listen(8080);

console.log('listening on port 8080');