// ajax.js
// communicate with the Yahoo stock API

//https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20yahoo.finance.quote%20WHERE%20symbol%20%3D%20'GOOG'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=
/*
{
  "diagnostics":"true",
  "q":"SELECT * FROM yahoo.finance.quote WHERE symbol = 'GOOG'",
  "format":"json",
  "env":"store://datatables.org/alltableswithkeys",
}

{
 "query": {
  "count": 1,
  "created": "2016-02-19T00:00:09Z",
  "lang": "en-US",
  "results": {
   // this can be an array, or a single object
   "quote": {
    "symbol": "GOOG",
    "AverageDailyVolume": "2479720",
    "Change": "-11.05",
    "DaysLow": "696.03",
    "DaysHigh": "712.35",
    "YearLow": "515.18",
    "YearHigh": "789.87",
    "MarketCapitalization": "480.00B",
    "LastTradePriceOnly": "697.35",
    "DaysRange": "696.03 - 712.35",
    "Name": "Alphabet Inc.",
    "Symbol": "GOOG",
    "Volume": "1881117",
    "StockExchange": "NMS"
   }
  }
 }
}
*/

//''.concat([])

console.log('ajax');

function request_error(req) {
  console.log('error: ',req);
}

function query_stocks(stocks,callback){
  if(!callback){
    callback=function(res){console.log('res');}
  }
  if(!stocks.length)throw 'query_stocks: no stocks provided';
  var host = 'https://query.yahooapis.com/v1/public/yql';
  var symbols = "'"+''.concat(stocks).toUpperCase()+"'"; // handles array or string
  var yql = 'q=SELECT%20*%20FROM%20yahoo.finance.quote%20WHERE%20symbol%20%3D%20'+symbols;
  var env = 'env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
  var format = 'format=json';
  var request = host + '?' + yql + '&' + env + '&' + format;

  sendAjaxRequest(request,callback,request_error);
}






// Some good old code from quirksmode
//http://www.quirksmode.org/js/xmlhttp.html
//sendAjaxRequest('file.txt',handleRequest,handleError);
function sendAjaxRequest(url,callback,onerror,postData) {
	var req = createXMLHTTPObject();
	if (!req) {
    return false;
  }
	var method = (postData) ? "POST" : "GET";
	req.open(method,url,true);
	//req.setRequestHeader('User-Agent','XMLHTTP/1.0');
	if (postData)
		req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	req.onreadystatechange = function () {
		if (req.readyState != 4) return;
		if (req.status != 200 && req.status != 304) {
//			alert('HTTP error ' + req.status);
      onerror(req);
			return;
		}
		callback(req);
	}
	if (req.readyState == 4) return;
	req.send(postData);
  return true;
}

var XMLHttpFactories = [
	function () {return new XMLHttpRequest()},
	function () {return new ActiveXObject("Msxml2.XMLHTTP")},
	function () {return new ActiveXObject("Msxml3.XMLHTTP")},
	function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

function createXMLHTTPObject() {
	var xmlhttp = false;
	for (var i=0;i<XMLHttpFactories.length;i++) {
		try {
			xmlhttp = XMLHttpFactories[i]();
		}
		catch (e) {
			continue;
		}
		break;
	}
	return xmlhttp;
}
