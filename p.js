var system=require('system');

console.log('Loading a web page');
var adr ="http://studentgovernment.nd.edu" 


var visited = {};


if (system.args.length > 1){
  adr=system.args[1];
}






//Saves the given image as a png
function saveToImage(url, fname){
  console.log(2);
  page=require("webpage").create();
  //Important image-rendering feature
  page.onConsoleMessage = function(msg){
    console.log(msg);
  }
  page.viewportSize = {
    width: 800,
    height: 600
  };
  var status; 
  console.log(3);
  page.open(url, function(status){
    var file = fname;
    if (status === "success" ){
      window.setTimeout( (function(){
        page.render(file);
        phantom.exit();
      }), 200 );  
    }
  });
}


console.log(1);
var call = saveToImage(adr,"test.png");


