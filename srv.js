var http = require('http');
var bot_id = "f40b238993fa1ff0ba59924c91"
var https = require('https');

var options = {
  hostname: 'api.groupme.com',
  method: 'POST',
  path: '/v3/bots/post'
};

var businessId = null;

http.createServer( function(req,resp) {
     var stuff = '';
     req.on('data', function(chunk) {
        stuff+=chunk;
     });

     req.on('end', function() {
        var obj = JSON.parse(stuff);
        var msg = obj.text;
        var name = obj.name;
        if(name!="WakeupBot" && JSON.stringify(msg).match("tired|sleep|rest")) {
        var uid = obj.sender_id;
        var msg = { "bot_id" : bot_id, "text" : "@"+name+" wake up", "attachments" : [{"type":"mentions","user_ids":[uid],"loci":[[0,name.length+1]]}] } ;
        https.request(options, null).end(JSON.stringify(msg));
        resp.end();
        }
        else if(name.match("Gracie Feucht") && 
JSON.stringify(msg).match("musical|Oklahoma|oklahoma")) {
           var msg = { "bot_id" : bot_id, "text" : "Oklahoma is a bad musical" };
           https.request(options,null).end(JSON.stringify(msg));
           resp.end();
        } else if(name!="WakeupBot" && JSON.stringify(msg).match("Zea's") ) {
           var msg = { "bot_id" : bot_id, "text" : "You mean Zea" };
           https.request(options,null).end(JSON.stringify(msg));
           resp.end();
        } else if(name!="WakeupBot" && JSON.stringify(msg).match("started a business") && !businessId) {
           var msg = { "bot_id" : bot_id, "text" : "Really @"+name+"? What is it?", "attachments" : [{"type":"mentions","user_ids":[uid],"loci":[[7,name.length+1]]}] };
           businessId = obj.sender_id;
           https.request(options,null).end(JSON.stringify(msg));
           setTimeout(clearBusiness, 15000);
           resp.end();
        } else if(obj.sender_id == businessId) {
           businessId = null;
           var msg = { "bot_id" : bot_id, "text" : "Oh nice! How's that going?" };
           https.request(options,null).end(JSON.stringify(msg));
           resp.end();
        } else if(JSON.stringify(msg).match("raspber")) {
           var msg = { "bot_id" : bot_id, "attachments" : [{ "type":"image", "url" : "http://hilobrow.com/wp-content/uploads/2009/05/channing-550.jpg"}] }
           https.request(options,null).end(JSON.stringify(msg));
           resp.end();
        } else if(JSON.stringify(msg).match("I wish") || JSON.stringify(msg).match("i wish")) {
           var msg = { "bot_id" : bot_id, "text" : "More than anything!" };
           https.request(options,null).end(JSON.stringify(msg));
        }
     });
}).listen(8000);

function clearBusiness() { businessId = null; }
