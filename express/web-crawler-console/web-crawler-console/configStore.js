var fs = require('fs');

var configs = [];

var crawlers = {
    get : function(name){
        for(var i = 0 ; i < configs.length; i++){
            if(configs[i].name === name){
                return configs[i];
            }
        }        
    },   
    all: function(){
        return configs;
    } 
};

function readConfig(){
  var config = fs.readFileSync('crawler.json');
  configs = JSON.parse(config);
}

readConfig();

module.exports = crawlers;