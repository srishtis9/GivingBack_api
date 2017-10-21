var request = require('request');
var datao = require('../data.js');

describe('single pledge scenarios',function(){
	
	var usercount = datao.usingreq;
    var piece = datao.psingreq;

	
	it('user should be able to pledge for the first time',function(done){
		
		var myJSONObject = {'pledgeTypes':[0] , 'puzzlePiece': piece};
		//usercount =usercount + 1;
		request({
    url: 'http://s2-dev-mobile-2:9010/givingback/user'+usercount+'/pledge',
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
   }, function (error, response, body){
     console.log(body);
	 console.log(response.statusCode);
	
	expect(response.statusCode).toBe(200);
	done();
});
  
	});
	
	it('user can pledge only once',function(done){
		piece = piece + 3;
		var myJSONObject = {'pledgeTypes':[0] , 'puzzlePiece': piece};
		
			request({
    url: 'http://s2-dev-mobile-2:9010/givingback/user'+usercount+'/pledge',
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
   }, function (error, response, body){
     console.log(body);
	 console.log(response.statusCode);
	expect(response.statusCode).toBe(500);
	 done();
});
	
   
	});
});

