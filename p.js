console.log('Loading a web page');
var page = require('webpage').create();
var url = 'https://www.bats.com/us/equities/market_statistics/book/spy/';

page.onConsoleMessage = function(msg){
  console.log(msg);
}


page.open(url, function(status){
  if ( status === "success" ){
    console.log("SUCCESS!");
    page.evaluate(function(){
      var d=document.getElementsByTagName("table");
      for(var i=0;  i<d.length; ++i){
        console.log(d[i].innerHTML );
        console.log(i);
      }
    });
    phantom.exit(0);
  } else {
    console.log("FAIL");
    phantom.exit(1);
  }
});
