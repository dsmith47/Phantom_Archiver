var system=require('system');

console.log('Loading a web page');
var adr ="http://studentgovernment.nd.edu" 

var visited = {};

if (system.args.length > 1){
  adr=system.args[1];
}


//Saves the given image as a png
function saveToImage(url, fname){
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
      var file = fname;
      if (status === "success" ){
        window.setTimeout( (function(){
          page.render(file);
          phantom.exit();
        }), 200 );  
      }
    });
  }

  return retrieve();
}



function search(url){
  page=require("webpage").create();
  page.onConsoleMessage = function(msg){
    console.log(msg);
  }


  access = function(){
    return page.open(url, function(status){
      console.log(status);
      if(status === "success"){
        page.evaluate(function(path){
          console.log(path);
          var as = document.getElementsByTagName("a");
          for( a in as ){
            if( !(String(as[a]).search(path)) ){
              console.log( String( as[a] ) );
            }
          }
        },url);
      }
    });
  }

  access();
}



//saveToImage(adr,"test.png");
search(adr);


