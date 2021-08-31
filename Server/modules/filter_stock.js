
//yyyy-mm-dd
var filter_stock = (stockList , symbol , range , start) =>{
    const startdate = new Date( start.slice(0,4),start.slice(5,7) ,start.slice(8,10) )
    const enddate =  new Date( start.slice(0,4),start.slice(5,7) ,start.slice(8,10) )
    
    if(range == 'WEEKLY'){
      enddate.setDate( enddate.getDate() + 7)
    }
    else{
      enddate.setMonth(enddate.getMonth() + 1)
    }
    //console.log(start ," ",start.slice(0,4),start.slice(5,7) ,start.slice(8,10)," ",startdate)
   // console.log(enddate)
    
    
    let filetered_stock = { symbol , close:[] , high: [] , low: [] , open: [] , volume: [] , date: [] }
    stockList.forEach( (stock ) => { 
        const date= stock.date;
        const dd = new Date( date.slice(0,4),date.slice(5,7) ,date.slice(8,10) );
        
    
        if(stock.symbol == symbol && startdate.getTime() <= dd.getTime() && dd.getTime() <= enddate.getTime()  ){
          //  console.log(date)
            filetered_stock.close.push(stock.close)
            filetered_stock.high.push(stock.high)
            filetered_stock.low.push(stock.low)
            filetered_stock.open.push(stock.open)
            filetered_stock.volume.push(stock.volume)
            filetered_stock.date.push(stock.date)
        }
    })
    console.log("done")
    return filetered_stock
}

module.exports = filter_stock;


/* function(stockData , symbol , range , start){
    const startdate = new Date( start.slice(0,4),start.slice(5,7) ,start.slice(9,11) )
    const enddate =  new Date( start.slice(0,4),start.slice(5,7) ,start.slice(9,11) )
    
    if(range == 'WEEKLY'){
      enddate.setDate( enddate.getDate() + 7)
    }
    else{
      enddate.setMonth(enddate.getDate() + 1)
    }
    
    let filetered_stock = { symbol , close:[] , high: [] , low: [] , open: [] , volume: [] , date: [] }
    stockList.forEach( (stock ) => { 
        const date=stock.date;
        Date dd = new Date( date.slice(0,4),date.slice(5,7) ,date.slice(9,11) );
        if(stock.symbol == symbol && startdate.getTime() <= dd.getTime() && dd.getTime() <= enddate.getTime()  ){
            filetered_stock.close.push(stock.close)
            filetered_stock.high.push(stock.high)
            filetered_stock.low.push(stock.low)
            filetered_stock.open.push(stock.open)
            filetered_stock.volume.push(stock.volume)
            filetered_stock.date.push(stock.date)
        }
    })
} */