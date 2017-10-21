var request = require('request');




var singlePledge = function(){
	
	//variable to hold the status
	//var myJSONObject ; 
	this.presentStatus = 0;
	
	this.doSinglePledge = function(pieceNo , usercount){
		
		//console.log('making pledge :  :');
		var myJSONObject = {'pledgeTypes':[0] , 'puzzlePiece':pieceNo };

request({
    url: 'http://s2-dev-mobile-2:9010/givingback/user'+usercount+'/pledge',
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
}, function (error, response, body){
    
	if(!error && response.statusCode == 200){
		console.log(body);
		console.log('pledge successful');
		//console.log(body.user.puzzlePiece.maxPieces);
		this.presentStatus = 200;
		//defered.fulfill(200);
		//defered.fulfill(body.success);
		
	}
	else{
			 console.log(body);
	         console.log('pledge unsuccessful');
			//presentStatus = body.status;
			this.presentStatus = 500;
			//defered.reject(body.status);
			
	    }
});
	
		
	};
	
};

module.exports = new singlePledge();

