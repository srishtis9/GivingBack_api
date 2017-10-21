var request = require('request');

request({
    url: 'http://s2-dev-mobile-2:9010/givingback/details',
    method: "GET",
    json: true  // <--Very important!!!
    
}, function (error, response, body){
    //console.log(response);
	if(!error && response.statusCode == 200){
		//console.log(body.puzzlePieces);
		var pieces = body.puzzlePieces;
		
		for(var i in pieces)
		{
			/*if(p.id === 3){
				
				console.log(p.currentPledges);
				console.log(p.isEnabled);
			}*/
			//console.log(pieces[i].id); **********works*
			
			if(pieces[i].id === 3)
			{console.log('got the 3rd piece ' + pieces[i].isEnabled);
				break;
			}
		}
		
	}
	else{console.log(body.puzzlePieces);
	    }
}); 