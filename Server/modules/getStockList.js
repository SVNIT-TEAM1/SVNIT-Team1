

const getStockList = (stockData) => {
    const StockList = []
    stockData.forEach( (stock) => {
        if(!StockList.includes(stock.symbol)){
            StockList.push(stock.symbol)
        }
    })
    
    return StockList
}

module.exports = getStockList