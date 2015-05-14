var express = require('express');
var path = require('path')
var fs = require('fs')
var app = express();               

app.use(express.static(path.join(__dirname,"html")))
app.use(express.static(path.join(__dirname,"css")))
app.use(express.static(path.join(__dirname,"js")))
app.use(express.static(path.join(__dirname,"lib")))
app.use(express.static(path.join(__dirname,"drum")))





var port = 3000;
app.listen(port);
console.log('Magic happens on port',port);

