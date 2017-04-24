// Render Multiple URLs to file

"use strict";
var RenderUrlsToFile, arrayOfUrls, system;

system = require("system");

/*
Render given urls
@param array of URLs to render
@param callbackPerUrl Function called after finishing each URL, including the last URL
@param callbackFinal Function called after finishing everything
*/
RenderUrlsToFile = function(urls, callbackPerUrl, callbackFinal) {
    var getFilename, next, page, retrieve, urlIndex, webpage;
    var visited = {};
    urlIndex = 0;
    webpage = require("webpage");
    page = null;
    
    next = function(status, url, file) {
        page.close();
        callbackPerUrl(status, url, file);
        return retrieve();
    };


    retrieve = function() {
        var url, new_urls;
        if (urls.length > 0) {
            url = urls.shift();
            urlIndex++;
            page = webpage.create();
            page.viewportSize = {
                width: 800,
                height: 600
            };
            page.settings.userAgent = "Phantom.js bot";
            return page.open("http://" + url, function(status) {
                var file;
                file = url+'page.png';
                console.log(file);
                if (status === "success") {
                    console.log(urls);
                    //Access the urls contained in this file
                    new_urls = page.evaluate( function(){
                      var out=[];
                      var as = document.getElementsByTagName("a");
                      console.log(as);
                      for( a in as){
                        if( typeof(as[a])=="object" ){
                          var new_url = as[a].getAttribute("href");
                          if( new_url != "/"  && new_url.lastIndexOf("http")!=0 && new_url.lastIndexOf("mailto")!=0 ){
                            console.log(new_url);
                            out.push( new_url );
                          }
                        }
                      }
                      return out;
                    });
                    console.log(url);
                    console.log(new_urls);
                    for(var i in new_urls){
                      if( !visited[new_urls[i]] ){
                        console.log( url+new_urls[i] );
                        visited[new_urls[i]] = true;
                        urls.push( url+new_urls[i] );
                      }
                    }
                    return window.setTimeout((function() {
                        page.render(file);
                        return next(status, url, file);
                    }), 200);
                } else {
                    return next(status, url, file);
                }
            });
        } else {
            return callbackFinal();
        }
    };
    return retrieve();
};

arrayOfUrls = null;

if (system.args.length > 1) {
    arrayOfUrls = Array.prototype.slice.call(system.args, 1);
} else {
    console.log("Usage: phantomjs render_multi_url.js [domain.name1, domain.name2, ...]");
}

RenderUrlsToFile(arrayOfUrls, (function(status, url, file) {
    if (status !== "success") {
        return console.log("Unable to render '" + url + "'");
    } else {
        return console.log("Rendered '" + url + "' at '" + file + "'");
    }
}), function() {
    return phantom.exit();
});
