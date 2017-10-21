var request = require('request');

describe('verifies the metrics',function(){
	
	it('verify the fund ',function(done){
		
	request({
    url: 'http://s2-dev-mobile-2:9010/givingback/details',
    method: "GET",
    json: true  // <--Very important!!!
    
     }, function (error, response, body){
		console.log(response.statusCode);
		expect(body.totalPledges > 2500).toBeTruthy();
		expect(body.puzzle.currentPledgeAmount === 25).toBeTruthy();
		done();
});
	});
});