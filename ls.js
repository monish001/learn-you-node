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