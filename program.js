//13 HTTP JSON API SERVER
var 
	//net = require('net'),
	map = require('through2-map'),
	http = require('http'),
	url = require('url'),
	//fs = require('fs'),
	//path = require('path'),
	port = process.argv[2],
	serveClient = function(request, res){
		var urlObj = url.parse(request.url, true);
		//console.log(urlObj);
		//console.log('URL obj:\n');
		//console.log(urlObj);
		var pathname = urlObj.pathname;
		var date = new Date(urlObj.query.iso);
		var result;
		if(pathname == "/api/unixtime"){
			result = {
				hour: date.getHours(),
				minute: date.getMinutes(),
				second: date.getSeconds()
			};
		}else if(pathname == "/api/parsetime"){
			result = {
				'unixtime' : date.getTime()
			};
		}
		//console.log('Result:\n');
		//console.log(result);
		res.write(JSON.stringify(result), 'utf8');
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end();
	},
	server = http.createServer(serveClient);
server.listen(port);
//server.close();

return;

//12 HTTP UPPERCASERER
var 
	//net = require('net'),
	map = require('through2-map'),
	http = require('http'),
	//fs = require('fs'),
	//path = require('path'),
	port = process.argv[2],
	serveClient = function(request, response){
		// if not POST, close
		if(request.method == "POST"){
			request.pipe(map(function(chunk){
				return chunk.toString().toUpperCase();
			})).pipe(response);
		}
	},
	server = http.createServer(serveClient);
server.listen(port);

//11 HTTP FILE SEVER
var net = require('net'),
	http = require('http'),
	fs = require('fs'),
	path = require('path'),
	port = process.argv[2],
	filePath = process.argv[3],
	fileStream = fs.createReadStream(filePath),
	serveClient = function(request, response){
		fileStream.pipe(response);
	},
	server = http.createServer(serveClient);
server.listen(port);

//10
var net = require('net'),
	port = process.argv[2],
	precision2 = function(num){
		return (num <10) ? '0' + num : num;
	},
	serveClient = function(socket){
		var date = new Date(), 
			data = date.getFullYear() + '-'
				+ precision2(date.getMonth() + 1) + '-'
				+ precision2(date.getDate()) + ' '
				+ precision2(date.getHours()) + ':'
				+ precision2(date.getMinutes()) + '\n';
		socket.end(data);
	},
	server = net.createServer(serveClient);
server.listen(port);

//9
var returnCount = 0,
	http = require('http'),
	str1 = '', str2 = '', str3 = '',
	getData = function(url){
		var processData = function(data){
			switch(url){
				case process.argv[2]:
					str1 += data;
					break;
				case process.argv[3]:
					str2 += data;
					break;
				case process.argv[4]:
					str3 += data;
					break;
			}
		};
		var end = function(){
			returnCount++;
			//console.log('DONE: ' + str);

			if(returnCount == 3){
				console.log(str1);
				console.log(str2);
				console.log(str3);
			}
		};
		http.get(url, function(response){
			response.setEncoding('utf8');
			response.on('data', processData);
			response.on('error', console.error);
			response.on('end', end);
		});
	};
getData(process.argv[2]);	
getData(process.argv[3]);	
getData(process.argv[4]);	

//8
var url = process.argv[2],
	http = require('http'),
	str = "";
http.get(url, function(response){
	var processData = function(data){
		str += data;
	};
	var printData = function(){
		console.log(str.length);
		console.log(str);
	};
	response.setEncoding('utf8');
	response.on('data', processData);
	response.on('error', console.error);
	response.on('end', printData);
});

//7
var url = process.argv[2],
	http = require('http');
http.get(url, function(response){
	response.setEncoding('utf8');
	response.on('data', console.log);
	response.on('error', console.error);
});

//6
//MODULE file ls.js
function getFilesListByExt(dir, ext, callback){
	var result = [],
		fs = require('fs'),
		path = require('path');
	ext = '.' + ext;
	fs.readdir(dir, function(err, list){
		if(err){
			callback(err);
			return;
		}
		for(var i=0; i<list.length; i++){
			if(path.extname(list[i]) == ext){
				result.push(list[i]);
			}
		}
		callback(null, result);
	});
}
module.exports = getFilesListByExt;

// USAGE OF ABOVE MODULE
var ls = require('./ls');
ls(process.argv[2], process.argv[3], function(err, list){
  //console.log('hello: ' + list.length);
  if(err){
    console.log(err);
    return;
  }
  for(var i=0; i<list.length; i++){
    console.log(list[i]);
  }  
});

//5
var dir = process.argv[2], 
  ext = '.' + process.argv[3],
  fs = require('fs'),
  path = require('path');
fs.readdir(dir, function(err, list){
  for(var i=0; i<list.length; i++){
    if(path.extname(list[i]) == ext){
      console.log(list[i]);
    }
  }
});

//4
var fs = require('fs'), callback;
callback = function(error, strData){
	console.log(strData.split('\n').length - 1);
};
fs.readFile(process.argv[2], 'utf8', callback);

//3
var fs = require('fs');
var buffer = fs.readFileSync(process.argv[2]);
var str = buffer.toString();
var numLines = str.split('\n').length - 1;
console.log(numLines);

//2
var length = process.argv.length, sum = 0, i;
for(i=2; i<length; i++)
sum += +process.argv[i];
console.log(sum);

//1
console.log('HELLO WORLD');
