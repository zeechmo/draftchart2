const local_app = function () {}
  
const express = require('express')
const https = require('https')
const nodemailer = require('nodemailer')
const xml2js = require('xml2js')
const _ = require('underscore')
//const config = require('./config')
const bodyParser = require("body-parser");
const csvtojson = require("csv-to-json");
const port = 3000

// * ———————————————————————————————————————————————————————— * //
// * 	init
// *
// *	gets called upon starting enduro.js production server
// *	@param {express app} app - express app
// *	@return {nothing}
// * ———————————————————————————————————————————————————————— * //
local_app.prototype.init = function (app) {
	
	// server js libaries
	app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
	app.use('/gridstack', express.static(__dirname + '/node_modules/gridstack/dist/'));
	app.use('/underscore', express.static(__dirname + '/node_modules/underscore/'));

	//Here we are configuring express to use body-parser as middle-ware.
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	
	// express app available here
	// don't forget these routes will be available on production server server (defaults to localhost:5000)
	app.get('/api/get_random_number', function (req, res) {
		res.send(Math.random().toString())
	})
	
	app.get('/draftboard', (request, response) => {  
		var format = request.query.format || 'standard';
		var teams = request.query.teams;
		var twoQB = request.query.twoQB || '1QB';
		
		if (teams === '8 team') {
			teams = 8;
		}
		else if (teams === '10 team') {
			teams = 10;
		}
		else if (teams === '12 team') {
			teams = 12;
		}
		else if (teams === '14 team') {
			teams = 14;
		}
		else {
			teams = 12;
		}
		
		var obj = {
			filename: format === "PPR" ? 
			(twoQB === "2QB" ? 'assets/data/draftchart_ppr2qb_rank.csv' : 'assets/data/draftchart_ppr_rank.csv') : 
			(twoQB === "2QB" ? 'assets/data/draftchart_standard2qb_rank.csv' : 'assets/data/draftchart_standard_rank.csv')
		};
		csvtojson.parse(obj, function(err, json) {
			response.send(JSON.stringify(json));
		});
	})

}

module.exports = new local_app()
