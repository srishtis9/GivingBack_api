var request = require('request');
var datao = require('../data.js');
var lupus = require('lupus');


describe('unlock a piece',function(){ ////*********just unlocks the piece ************************
	var pieceno = datao.samePiece ;
    var usercount = datao.sameuser + 50;
	it('unlocking a piece',function(done){
		
		lupus(pieceno, pieceno+1, function(n){
	
	var myJSONObject = {'pledgeTypes':[0] , 'puzzlePiece': n};
	
	lupus(0, 9, function(m){
		
		usercount = usercount+1;
		
		request({
    url: 'http://s2-dev-mobile-2:9010/givingback/user'+usercount+'/pledge',
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
}, function (error, response, body){
	 
	if(!error && response.statusCode == 200){
		//pledgecount = pledgecount+1;
		console.log(response.statusCode);
	}
	
});
	});
	
	
});
done();
	});
});