var express = require('express');
var path = require('path')
var fs = require('fs')
var app = express();               

var assetFolders = ['html','css','js','lib','drum']

for(var i = 0; i < assetFolders.length; i++){
	app.use(express.static(path.join(__dirname,assetFolders[i])))
}

var port = 3000;
app.listen(port);
console.log('Magic happens on port',port);

