const fs = require('fs');
const path = require('path');


function readJSON(){
  
    
    let stockList = [];
    
    var getStream = function () {
        var jsonData = path.join(__dirname, '/stockList.json')
        const stream = fs.readFileSync(jsonData)
        const parser = stream.toString();
        return JSON.parse(stream);
    }; 
    
    stockList = getStream()
    return stockList;
}

module.exports = readJSON;