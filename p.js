var system=require('system');

console.log('Loading a web page');
var adr ="http://studentgovernment.nd.edu" 

var visited = {};

if (system.args.length > 1){
  adr=system.args[1];
}


//Saves the given image as a png
function saveToImage(url){
  page=require("webpage").create();
  page.onConsoleMessage = function(msg){
    console.log(msg);
  }
  //Important image-rendering feature
  retrieve = function(){
    page.viewportSize = {
      width: 800,
      height: 600
    };
    var status; 
    return page.open(url, function(status){
      var file = url+".png";
      if (status === "success" ){
        window.setTimeout( (function(){
          page.render(file);
          branches = page.evaluate(search,url);
          for (i in branches){
            console.log(branches[i]);
          }
        }), 200 );  
      }
    });
  }

  return retrieve();
}





var search = function(path){
  var out = [];
  console.log("SEARCH FUNC");
  var as = document.getElementsByTagName("a");
  for( a in as ){
    if( typeof(as[a]) == 'object' ){
      var new_url = String(as[a].getAttribute('href') );
      if( new_url != "/" && ( new_url.lastIndexOf("http")!=0 ) ){
        out.push( new_url );
      }
    }
  }
  return out;
}

//MAIN execution ///////////////////////////////////////////////////////////////

saveToImage(adr);

