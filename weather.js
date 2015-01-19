//includes
var YQL = require('yql');
var request = require('request');


//my cloudbit
var snivy = "243c200c0659";

//set up request to send.

var options = {
  method: "POST",
  url: 'https://api-http.littlebitscloud.cc/v2/devices/'+snivy+'/output',
  body: JSON.stringify({
    "percent":20,
    "duration_ms":100000 }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 6d630e379022ae61c3aad73e056d529fd6ad293146dea7f33ea481a132120dbd'
    }
};


//completion function
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(JSON.stringify(body));
    }
  }


//send request.
request(options, callback);
