class Study{
	
	constructor(axiom, genotype){
		this.axiom = axiom;
		this.genotype = genotype;
		this.decoded = Tools.decode(this.genotype);
		this.movements = new Array();
		
		this.fitness = 0;
	}
}