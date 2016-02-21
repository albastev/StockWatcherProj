// manage-stocks.js
// provides ability to manage watched stocks

console.log('manage-stocks');

var STOCKS = [];
if(!window.localStorage){
  localStorage = {};
}

if(!localStorage["stocks"]){
  localStorage["stocks"] = JSON.stringify([]);
}else{
  STOCKS = JSON.parse(localStorage["stocks"]);
  document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('display').innerHTML='';
    query_stocks(STOCKS,Manager.process_stocks);
  });
}

var Manager = {
  // here we store the cannonical wrapper objects
  // for all of the stocks rendered in the app
  stock_hash : {},
  add_stock : function(){
    // Listener for the Add button
    var el = document.getElementById('stock-in');
    console.log(el,el.value);

    query_stocks(el.value, Manager.process_stocks)
  },
  remove_stock : function(stock){
    console.log('remove');
    // in case we want to implement a remove button
    if(!stock)return false;
    console.log(1)
    if(stock.model){
      stock = stock.model;
    }else if(stock.charAt && this.stock_hash[stock]){
      stock = this.stock_hash[stock];
    }
    console.log(2,stock)
    if(!stock.model){
      return false;
    }
    // remove rendered tile
    if(stock.id && this.stock_hash[stock.id]){
      console.log('removeElement')
      var el = this.stock_hash[stock.id].element;
      el.parentNode.removeChild(el);
      delete this.stock_hash[stock.id];
    }
    // remove from STOCKS and store in localStorage
    console.log('remove data')
    var idx = STOCKS.indexOf(stock.id);
    if(idx>=0)STOCKS.splice(idx,1);

    localStorage["stocks"] = JSON.stringify(STOCKS);
  },
  process_stocks : function(res){
    // get array of stocks returned
    var quote = JSON.parse(res.response).query.results.quote;
    if(!Array.isArray(quote))quote=[quote];
    console.log(quote)
    for(var i = 0; i < quote.length;i++){
    // check that it is real
      if(!quote[i].StockExchange){
        // Alert the user that the symbol is wrong
        console.log('Symbol does not exist')
        continue;
      }

    // check if it already is registered
    if(Manager.stock_hash[quote[i].Symbol]){
      console.log('update stock quote')
      Manager.update_stock(quote[i]);
      continue;
    }

    if(STOCKS.indexOf(quote[i].Symbol)===-1){
      if(STOCKS.length === 0){
        document.getElementById('display').innerHTML='';
      }
      // add it to STOCKS and store in localStorage
      console.log('storing',STOCKS)
      STOCKS.push(quote[i].Symbol);
      localStorage["stocks"] = JSON.stringify(STOCKS);
    }

    // create it
    console.log('new one')
    var ob = new Views.tile(quote[i]);
    Manager.stock_hash[ob.id]=ob;

    // render it

    }
  },
  update_stock : function(quote){
    //
  }
}
