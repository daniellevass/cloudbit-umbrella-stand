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


      var allItems = response.query.results.channel;
      //  console.log(JSON.stringify(items) );

      var tomorrow = allItems[1].item.forecast;



      if (parseInt(tomorrow.code) == 11) {
        console.log("light rain!!!");
        sendRequestToCloudBit(40);
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

/*
Code	Description
0	tornado
1	tropical storm
2	hurricane
3	severe thunderstorms
4	thunderstorms
5	mixed rain and snow
6	mixed rain and sleet
7	mixed snow and sleet
8	freezing drizzle
9	drizzle
10	freezing rain
11	showers
12	showers
13	snow flurries
14	light snow showers
15	blowing snow
16	snow
17	hail
18	sleet
19	dust
20	foggy
21	haze
22	smoky
23	blustery
24	windy
25	cold
26	cloudy
27	mostly cloudy (night)
28	mostly cloudy (day)
29	partly cloudy (night)
30	partly cloudy (day)
31	clear (night)
32	sunny
33	fair (night)
34	fair (day)
35	mixed rain and hail
36	hot
37	isolated thunderstorms
38	scattered thunderstorms
39	scattered thunderstorms
40	scattered showers
41	heavy snow
42	scattered snow showers
43	heavy snow
44	partly cloudy
45	thundershowers
46	snow showers
47	isolated thundershowers
3200	not available
*/
