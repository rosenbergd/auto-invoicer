# Auto-invoicer
My first node module for creating invoices with json objects

## Description

Auto-invoicer creates invoices through json objects and publishes them as a pdf file

## Installation

uses npm package manager to install. use the following command to install:

    npm install auto-invoicer
    
## Example

	var test = require('./test.js');
	var write = new test();
	//read json file:
	var obj;
	var fs = require("fs");
	var data;
	var data = fs.readFileSync("invoice.json", "UTF-8");
	//parse to an object
	var obj = JSON.parse(data);
	write.generate(obj);//send in the json object
	write.writer();//write the file

##JSON file structure

	{
		"customer":{
			"name":"person's name",
			"address":"person's address",
			"items":[ #unlimited entries
				{
					"description":"item 1 description",
					"price":100.0,
					"quantity":5
				},
				{
					"description":"item 2 description",
					"price":200.0,
					"quantity":9
				},
				{
					"description":"item 3 description",
					"price":500.0,
					"quantity":10
					}
			],
			"vat":14.0,
			"date":"2013-12-12"
		}
	}
	
##Updates may include features such as:

	*Editing footers and headers
	*Editing photo and adding photo
	*User suggestions
	*etc.
	
##Features

	*unlimited entries
	
##Thanks

	I will be happy to know that people are using this module.
	
	Enjoy.
	contact: dampi05@gmail.com