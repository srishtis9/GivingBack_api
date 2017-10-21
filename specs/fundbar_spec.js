var request = require('request');
var lupus = require('lupus');
var async = require('async');
var piece1 = 0;
var piece2 = 290;
var usercount = 100 ;
var totalPledges;
var currentAmount;
var flag = false;
describe('2500 post requests',function(){
	
	it('running requests',function(done){
		//runs(function(){

async.series([
    function(callback) {
        // ****calling the lupus****
		lupus(piece1, piece2, function(n){
	
	myJSONObject = {'pledgeTypes':[0] , 'puzzlePiece': n};
	
	
	
	lupus(0, 9, function(m){
		
		usercount = usercount+1;
		
		request({
    url: 'http://s2-dev-mobile-2:9010/givingback/user'+usercount+'/pledge',
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
}, function (error, response, body){
	 
	if(!error && response.statusCode === 200){
       console.log(response.statusCode);
	}
	else{
		 console.log(body.status);
		}
});
	});
	
	
});
        callback(null, 'one');
    },
    function(callback) {
        // ******get request ******
		
		request({
    url: 'http://s2-dev-mobile-2:9010/givingback/details',
    method: "GET",
    json: true  // <--Very important!!!
    
}, function (error, response, body){
   
	
		console.log('get request');
		var pieces = body.puzzle;
		totalPledges = body.totalPledges;
		currentAmount = pieces.currentPledgeAmount;
		console.log('total pledges '+totalPledges +' current fund '+ currentAmount);
		
	
	
});
		
        callback(null, 'two');
    }
],
// optional callback
function(err, results) {
    // results is now equal to ['one', 'two']
		console.log('making assertions');
		expect(totalPledges > 2500).toBeTruthy();
		done;
	
});
//});



  
	},10000);

});