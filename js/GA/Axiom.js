class Axiom{
	
	constructor(parameters){
		
		// Generic Algorithm
		this.genotypeSize = 32;
		this.colony = parameters.has("colony") ? parameters.get("colony") : 10;
		this.elite = parameters.has("elite") ? parameters.get("elite") : 3;
		this.mutation = parameters.has("mutation") ? parameters.get("mutation") : 0.05;

		// Bacteria map
		this.map_height = 25;
		this.map_width = this.map_height;
		this.map_size = this.map_height * this.map_width;
		this.map_probability = 0.17;
		this.map = Tools.generateMap(this.map_height, this.map_size, this.map_probability);
		
		// Player
		this.player = parseInt(this.map_size/2 - this.map_height/2) + 1;
		this.map[this.player] = 2;
	}



}