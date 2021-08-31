

var filter_stock = function(stockList , symbol){
    
    
    let filetered_stock = { symbol , close:[] , high: [] , low: [] , open: [] , volume: [] , date: [] }
    stockList.forEach( (stock ) => { 
        if(stock.symbol == symbol){
            filetered_stock.close.push(stock.close)
            filetered_stock.high.push(stock.high)
            filetered_stock.low.push(stock.low)
            filetered_stock.open.push(stock.open)
            filetered_stock.volume.push(stock.volume)
            filetered_stock.date.push(stock.date)
        }
    })
    console.log("done")
    console.log(filetered_stock)
    return filetered_stock
}

module.exports = filter_stock;


