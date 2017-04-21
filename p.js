var system=require('system');
var page = require('webpage').create();
page.onConsoleMessage = function(msg){
  console.log(msg);
}

console.log('Loading a web page');
var adr ="http://studentgovernment.nd.edu" 


var visited = {};
var frontier = [adr];

var search = function(url){
  console.log( url );

  page.open(url,function(status){
    console.log( url );
    if(status==="success"){
      console.log("SUCCESS");
      page.evaluate(function(){
        console.log("Evaluating");
        var as = document.getElementByTagName("a");
        if( String(as[a]).search( "studentgov" ) > 0  && !visited[ as[a] ] ){
          console.log( String(as[a]) );
          search( String(as[a]) );
        }
      });
    }
  });
}

if (system.args.length > 1){
  adr=system.args[1];
}

while( frontier.length > 0 ){
  url=frontier.pop();
  search(url);
}












//url_search(adr, visited, page);

// UTILITY FUNCTIONS ////////////
function url_search( url,visited, page){
  console.log(url);
  visited[url]=true;
  page.open(url, function(status){
    if ( status === "success" ){
      page.evaluate(function(visited,url,url_search){
        var as = document.getElementsByTagName("a");
        for (a in as){
          if( String(as[a]).search( "studentgov" ) > 0  && !visited[ as[a] ] ){
            url_search( String(as[a]), visited, page );
          }
        } 
      }, visited,url,url_search);
    } else {
      console.log("FAIL");
      phantom.exit(1);
    }
  });

}
