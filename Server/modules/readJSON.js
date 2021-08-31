const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require('event-stream');
const path = require('path');


function readJSON(){
    var getStream = function () {
        var jsonData = path.join(__dirname, '/stockList.json'),
            stream = fs.createReadStream(jsonData, { encoding: 'utf8' }),
            parser = JSONStream.parse('*');
        return stream.pipe(parser);
    };
    
    let stockList = [];
    
    const read = new Promise(function(resolve, reject){
        getStream()
        .pipe(es.mapSync(function (data) {
            stockList = data;
        }));
    })
    

    return stockList;
}


module.exports = readJSON;