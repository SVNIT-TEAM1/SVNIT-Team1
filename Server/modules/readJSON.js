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
    
    function cb(err, data){
        if(err!=null)
            console.log(err);
        else{
            console.log("123");
            console.log(data);
            return data;
        }       
    }

    getStream()
        .pipe(es.mapSync(function (data) {
            console.log(data);
            console.log("123");
            return data;
        }));
    
}

module.exports = readJSON;