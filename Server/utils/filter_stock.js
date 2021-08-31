function filter_stock(stockList , symbol){
    
    const filtered_stock = stockList.filter( (stock) => stock.symbol == symbol  )

    return filtered_stock.map( (stock ) => ({ symbol:stock.symbol ,
                                                close  : stock.close,
                                                high  : stock.high,
                                                low  : stock.low,
                                                open  : stock.open,
                                                date:stock.date,
                                                volume  : stock.volume,} 
                                            ))
}

modules.export = filter_stock



/* 
const stock = [
    {
          close  : 129.41,
          high  : 133.6116,
          low  : 126.76,
          open  : 133.52,
          symbol  :   'AAPL'  ,
          volume  : 143301887,
          id  :   'HISTORICAL_PRICES'  ,
          key  :   'AAPL'  ,
          subkey  :   ''  ,
          date  :   2021-01-04  ,
          updated  : 1628263122000,
          changeOverTime  : 0,
          marketChangeOverTime  : 0,
          uOpen  : 133.52,
          uClose  : 129.41,
          uHigh  : 133.6116,
          uLow  : 126.76,
          uVolume  : 143301887,
          fOpen  : 132.8956,
          fClose  : 128.8048,
          fHigh  : 132.9868,
          fLow  : 126.1672,
          fVolume  : 143301887,
          label  :   'Jan 4, 21'  ,
          change  : 0,
          changePercent  : 0
    },
    {
          close  : 131.01,
          high  : 131.74,
          low  : 128.43,
          open  : 128.89,
          symbol  :   'MSFT'  ,
          volume  : 97664898,
          id  :   'HISTORICAL_PRICES'  ,
          key  :   'AAPL'  ,
          subkey  :   ''  ,
          date  :   2021-01-05  ,
          updated  : 1628262969000,
          changeOverTime  : 0.012363804960976697,
          marketChangeOverTime  : 0.012363804960976697,
          uOpen  : 128.89,
          uClose  : 131.01,
          uHigh  : 131.74,
          uLow  : 128.43,
          uVolume  : 97664898,
          fOpen  : 128.2872,
          fClose  : 130.3973,
          fHigh  : 131.1239,
          fLow  : 127.8294,
          fVolume  : 97664898,
          label  :   'Jan 5, 21'  ,
          change  : 1.5999999999999943,
         changePercent  : 0.0124
    }
]
filter_stock(stock,'AAPL') */