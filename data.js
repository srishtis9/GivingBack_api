var data = function(){
	this.usingreq = 11; //here one user is used and p , p+3 are used
	this.psingreq = 59;
	
	
	this.utpc = 22;//single user pledges for a single piece.
	this.ptpc = 31;
	
	//for the three specs dealing with unlocking a piece ****they will have the same piece
	
	this.samePiece = 25;
	this.sameuser = 50;
	
	//for 2500 pledges
	
	this.piece1 = 0;
	this.piece2 = 290;//290 actual value
	this.user25 = 1000;
	
	//for another 2500 pledges
	
	this.piece3 = 576;
	this.user50 = 50000;
	this.user502 = 60000;
};

module.exports = new data();