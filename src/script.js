const fs = require('fs-extra');
const path = require('path');
function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
	.filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}

function getUserId(){
	var mypath = path.resolve("users");
	var thefolders = getDirectories(mypath);

	console.log(thefolders);
}