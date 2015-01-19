//includes
var YQL = require('yql');
var request = require('request');


var bathWOEID = 12056;




function getDataFromYahoo(){

  var query = new YQL('select item.forecast from weather.forecast where woeid=12056 AND u=\'c\'');

  query.exec(function (error, response) {


    if(error){
      console.log("error!");
    } else {


      var items = response.query.results.channel;
      //  console.log(JSON.stringify(items) );

      for(var index in items){

        var item = items[index];


        console.log(JSON.stringify(item.item.forecast));
        console.log(item.item.forecast.code);
        
      }


    }

  });


}

function sendRequestToCloudBit(percent){
  //my cloudbit
  var snivy = "243c200c0659";


  //set up request to send.
  var options = {
    method: "POST",
    url: 'https://api-http.littlebitscloud.cc/v2/devices/'+snivy+'/output',
    body: JSON.stringify({
      "percent":percent,
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


}


//sendRequestToCloudBit(30);


getDataFromYahoo();
