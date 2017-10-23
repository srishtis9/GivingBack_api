var request = require('request');
var lupus = require('lupus');
var datao = require('../data.js');
var async = require('async');

describe('concurrent pledging',function(){
	
	var pieceno = 51;
	var usercount = 2000;
	 var pledgecount = 0 ;
	 
	beforeEach(function(done){
		//pledging 8 times for the same piece //
 lupus(pieceno, pieceno+1, function(n){
	
	var myJSONObject = {'pledgeTypes':[0] , 'puzzlePiece': n};
	
	lupus(0, 8, function(m){
		
		usercount = usercount+1;
		
		request({
    url: 'http://s2-dev-mobile-2:9010/givingback/user'+usercount+'/pledge',
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
}, function (error, response, body){
	 
	if(!error && response.statusCode == 200){
		pledgecount = pledgecount+1;
	}
	
});
	});
	expect(pledgecount === 8).toBeTruthy();
	
});
	done();	
	});
	
	it('making concurrent 9th pledge',function(){
		
		async.parallel([
    function(callback) {
			var myJSONObject = {'pledgeTypes':[0] , 'puzzlePiece': pieceno};
			usercount = 5011;
		request({
    url: 'http://s2-dev-mobile-2:9010/givingback/user'+usercount+'/pledge',
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
   }, function (error, response, body){
    console.log(body); 
	//expect(response.statusCode).toBe(200);
	
});
       
      callback(null, 'one');
        
    },
    function(callback) {
		
	var myJSONObject = {'pledgeTypes':[0] , 'puzzlePiece': pieceno};
	usercount = 6010;
		request({
    url: 'http://s2-dev-mobile-2:9010/givingback/user'+usercount+'/pledge',
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
   }, function (error, response, body){
    console.log(body); 
	//expect(response.statusCode).toBe(200);
	
});
       
            callback(null, 'two');
        
    }
],
// optional callback
function(err, results) {
    // the results array will equal ['one','two'] even though
    // the second function had a shorter timeout.
});
	});
});