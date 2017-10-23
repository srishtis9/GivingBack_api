var request = require('request');
var datao = require('../data.js');
var lupus = require('lupus');
var sleep = require('system-sleep');

describe('making first 2500 pledges',function(){
	
	var piece1 = datao.piece1;
	var piece2 = datao.piece2;
	var usercount = datao.user25;
	
	it('making 2500 pledges',function(done){
		lupus(piece1, piece2, function(n){
	
	myJSONObject = {'pledgeTypes':[0] , 'puzzlePiece': n};
	
	//console.log('pledging for piece ' + n);
	
	lupus(0, 9, function(m){
		
		usercount = usercount+1;
		
		//sending the pledge request
		
		request({
    url: 'http://s2-dev-mobile-2:9010/givingback/user'+usercount+'/pledge',
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
}, function (error, response, body){
	 
	if(!error && response.statusCode == 200){
		console.log(response.statusCode);
	}
	else{console.log(body);
			
	    }
});
	});
		sleep(500);
	
});
done();
	});
});