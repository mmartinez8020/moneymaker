// var http = require("http");
// var url = require('url');
var express = require('express');
var path = require('path')
var fs = require('fs')
var app = express();               

app.use("/",express.static(path.join(__dirname,"staticfiles")))

app.listen(3000);
console.log('Magic happens on port ');

