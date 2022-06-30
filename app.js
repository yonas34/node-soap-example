/*jslint node: true */
"use strict";


var soap = require('soap');
var express = require('express');
var fs = require('fs');
const { query } = require('express');

// the splitter function, used by the service
function Insert_function(args) {
    console.log(args);
    switch(args.Header.ServiceType)
    
    {case undefined:return {
        result: "Saved Successfully!"
        }
      case "get":
        {
          
        return Query(args);
      }
      }
}
function Query(args)
{
  console.log(args);

return{ status:"query",
OriginatorConversationID:"OriginatorConversationID",
ResultType:"ResultType",
ResultCode:"ResultCode",
ResultDesc:"ResultDesc",
TransactionID:"TransactionID"
}












}
// the service
var serviceObject = {
  ResultApiService: {
        ResultApiServiceSoapPort: {
            ResultApi: Insert_function
        },
        ResultApiServiceSoap12Port: {
            ResultApi: Insert_function
        }
    },QueryService: {
      QuerySoapPort: {
     
          Query:Query
      },
      QuerySoap12Port: {
  
          Query:Query
      }
  }
};

// load the WSDL file
var xml = fs.readFileSync('service.wsdl', 'utf8');
// create express app
var app = express();

// root handler
app.get('/', function (req, res) {
  res.send('Node Soap Example!<br /><a href="https://github.com/macogala/node-soap-example#readme">Git README</a>');
})

// Launch the server and listen
var port = 8000;
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
});