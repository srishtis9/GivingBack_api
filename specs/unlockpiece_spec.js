var request = require('request');
var usercount = 1070;
var pieceno = 72 ;
var lupus = require('lupus');

describe('unlocking  piece',function(){
	 var pledgecount = 0 ;
	 
it('unlocking the piece',function(done){
		
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
		pledgecount = pledgecount+1;
	}
	
});
	});
	
	
});//piece unlocked 

//verify if true : piece unlocked

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
			
			 expect(pieces[i].currentPledges === pieces[i].maxPledges).toBeTruthy();
			 expect(pieces[i].isEnabled).toBe(true);
				break;
			}
		}
		
	}
	done();
}); 

//********************verify if unlocked *********
		
		
	});
});