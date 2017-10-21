var request = require('request');
var lupus = require('lupus');
var async = require('async');
var datao = require('../data.js');
var pieceno = 63;
var usercount = 1080;
var currentp;
var maxp;
var cstatus;
var flag = false;
describe('using async',function(){
	it('it block',function(done){
		
		runs(function(){async.series([
    function(callback) {
        // do some stuff ...//unlocking a pieceno
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
	else{console.log(body.status);}
	
});
	});
	
	
});
        callback(null, 'one');
    },
    function(callback) {
        // do some more stuff ...//validating if unlocked
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
			 currentp = pieces[i].currentPledges ;
			 maxp = pieces[i].maxPledges;
			 cstatus = pieces[i].isEnabled;
			 //expect(pieces[i].currentPledges === pieces[i].maxPledges).toBeTruthy();
			 //expect(pieces[i].isEnabled).toBe(true);
				break;
			}
		}
		
	}
	
});
        callback(null, 'two');
    },
	  function(callback) {
        // do some more stuff ...
		flag = true;
        callback(null, 'three');
    }
],

// optional callback
function(err, results) {
    // results is now equal to ['one', 'two']
	//expect(currentp === maxp).toBeTruthy();
	//expect(cstatus).toBeTruthy();
	//done();
	
	
});
	});//// runs

waitsFor(function(){return flag;},"waiting",1000);

runs(function(){
	expect(currentp === maxp).toBeTruthy();
	expect(cstatus).toBeTruthy();
});
		
	});

xit('it block',function(done){
	expect(currentp === maxp).toBeTruthy();
	expect(cstatus === true).toBeTruthy();
	done();
});
});

