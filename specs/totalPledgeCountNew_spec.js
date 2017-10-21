var request = require('request');
var datao = require('../data.js');

var pledgesBefore ;
var pledgesAfter ;

describe('total pledge count should increase',function(){
	
	var usercount = datao.utpc;
 var pieceno = datao.ptpc;
	
	it('pledge count before',function(done){
		
		request({
    url: 'http://s2-dev-mobile-2:9010/givingback/details',
    method: "GET",
    json: true  // <--Very important!!!
    
}, function (error, response, body){
   
	if(!error && response.statusCode == 200){
	
		 pledgesBefore = body.totalPledges;
		 console.log('pledges before' + pledgesBefore);
		
	}
	expect(response.statusCode).toBe(200);
	done();
});
	});
	
	
	it('pledging for a piece',function(done){
		
		var myJSONObject = {'pledgeTypes':[0] , 'puzzlePiece': pieceno};
		request({
    url: 'http://s2-dev-mobile-2:9010/givingback/user'+usercount+'/pledge',
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
   }, function (error, response, body){
    console.log(body); 
	expect(response.statusCode).toBe(200);
	done();
});
	});
	
	it('pledge count after',function(done){
		request({
    url: 'http://s2-dev-mobile-2:9010/givingback/details',
    method: "GET",
    json: true  // <--Very important!!!
    
}, function (error, response, body){
   
	if(!error && response.statusCode == 200){
	
		 pledgesAfter = body.totalPledges;
		 console.log('pledge count after '+ pledgesAfter);
		expect(pledgesAfter > pledgesBefore).toBeTruthy();
	}
	done();
});
	});
});