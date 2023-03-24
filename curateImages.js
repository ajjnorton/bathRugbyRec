const fs = require('fs');
const { writeFile, readFile } = require("fs");
let jsonFile = require('jsonfile');
var filenamesToJSON = require("filenames-to-json");

console.log(__dirname)
var path = __dirname + '/src/assets/images'
console.log(path)


filenamesToJSON(path, "input.json", "myFileNames", 4);

;
