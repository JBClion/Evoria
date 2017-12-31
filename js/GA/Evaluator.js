self.addEventListener('message', function(e) {
  self.postMessage(new Evaluator(e.data).evaluate());
}, false);

class Evaluator{

	constructor(study){
		this.study = study;
		this.axiom = study.axiom;
		this.genome = study.decoded;

		this.map   	= this.axiom.map;
		this.dim    = this.axiom.map_height;
		this.player = this.axiom.player;

		this.lost  = false;
		this.win   = false;

		this.itr = 0;
		this.movements = [this.player];
		this.moves = [-this.dim, 1, -1, this.dim];
	}
	
	evaluate(){

		while(!this.lost && !this.win){
			this.move(this.getNextMove());
			this.itr++;
		}

		this.study.movements = this.movements;
		this.study.fitness = this.score();
		
		return this.study;	
	}

	getNextMove(){
		var surrounding = this.getSurrounding();
		var action = this.genome[surrounding];
		var move = this.moves[action];

		return move;
	}

	getSurrounding(){

		var up 		= this.map[this.player - this.dim];
		var right 	= this.map[this.player + 1] * 2;
		var down 	= this.map[this.player + this.dim] * 4;
		var left 	= this.map[this.player - 1] * 8;
		
		return (up + right + down + left);
	}	

	move(action){
		this.map[this.player] = 0;
		this.player += action;
		this.map[this.player] += 2;
		this.movements.push(this.player);
		this.checkRules();
	}

	checkRules(){
		this.lost = ((this.map[this.player] >= 3) || (this.itr >= 100));
		this.win = ((this.player+1) % this.dim) === 0;
	}

	score(){
		return (parseInt(this.player % this.dim) / (this.dim-1)) * 100;
	}
}