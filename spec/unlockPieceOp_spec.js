var request = require('request');
var datao = require('../data.js');

describe('operations on unlocked piece',function(){
	var pieceno = datao.samePiece ;
	var usercount = datao.sameuser + 20;
	//verify if the piece is unlocked
	
	beforeEach(function(done){
		request({
    url: 'http://s2-dev-mobile-2:9010/givingback/details',
    method: "GET",
    json: true  // <--Very important!!!
    
}, function (error, response, body){
   
	if(!error && response.statusCode == 200){
	
		var pieces = body.puzzlePieces;
		
		for(var i in pieces)
		{
			
			if(pieces[i].id === pieceno) /////change the piece no////
			{//console.log('got the 3rd piece ' + pieces[i].isEnabled);
			
			 expect(pieces[i].isEnabled).toBe(true);
			 console.log(pieceno +' enabled status ' + pieces[i].isEnabled);
				break;
			}
		}
		
	}
	done();
}); 
	});
	
	it('pledging for an unlocked piece',function(done){
		
	var myJSONObject = {'pledgeTypes':[0] , 'puzzlePiece':pieceno };

		usercount = usercount +1;
request({
    url: 'http://s2-dev-mobile-2:9010/givingback/user'+usercount+'/pledge',
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
}, function (error, response, body){
    
	expect(body.status === 500).toBeTruthy();
	console.log('pledge cannot be done for an unlocked piece');
	done();
	
});
	});
});