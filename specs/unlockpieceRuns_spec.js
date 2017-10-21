var request = require('request');
var usercount = 90;
var pieceno = 65 ;
var lupus = require('lupus');
var flag = false;

describe('a piece is unlocked after reqired no of pledges',function(){
	
	  
	 beforeEach(function(){
		runs(function(){
			
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
	
	flag = true;
});
			
		},"async function");
		
		waitsFor(function(){
			return flag;
		},"the flag should be true",4000);
		
	});
	
	
	it('verify if the piece is unlocked',function(done){
		request({
    url: 'http://s2-dev-mobile-2:9010/givingback/details',
    method: "GET",
    json: true  // <--Very important!!!
    
}, function (error, response, body){
   
	if(!error && response.statusCode == 200){
	
		var pieces = body.puzzlePieces;
		
		for(var i in pieces)
		{
			
			if(pieces[i].id === pieceno) 
			{
			 console.log('enabled status '+ pieces[i].isEnabled ); 
			 expect(pieces[i].currentPledges === pieces[i].maxPledges).toBeTruthy();
			 expect(pieces[i].isEnabled).toBe(true);
				break;
			}
		}
		
	}
	done();
});
	});
	
	
});