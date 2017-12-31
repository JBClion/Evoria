const IN  = new Map([['0', '1'],['1', '0']])

class Tools{
	
	static sort(studies){
		return studies.sort(compare);
	}

	static createGenome(size){
	    var genotype = "";

	    for(var i = 0; i < size; i++){ 
	        genotype += (Math.random() > 0.5) ? "1" : "0";
	    }

	    return genotype;
	}

	static decode(genotype){
    
	    var toReturn = new Array();

	    if(genotype){
	        var code = genotype.match(/.{2}/g);
	        
	        for (var i = 0; i < code.length; i++) {
	            toReturn.push(this.toDecimal(code[i]))
	        }
	    }

	    return toReturn;
	}

	static toDecimal(binary){

	    var toReturn = NaN;

	    if(binary && isFinite(binary)){
	        toReturn = parseInt(binary, 2);
	    }

	    return toReturn;
	}

	static generateMap(dim, size, p){
	 	var map = new Array();

	 	// Init matrix
	    for(var i = 0; i < size; i++){ 
	    	map[i] = (Math.random() > p ? 0 : 1); 
	    }
	    
	    for(var i = 0; i < dim; i++){ map[i] = 1; }
	    for(var i = size-dim; i < size; i++){ map[i] = 1; }
	    for(var i = 0; i < size-dim; i = i + dim){ map[i] = 1; }
	    for(var i = dim+1; i < size-(2*dim); i = i + dim){ map[i] = 0; }
	    for(var i = dim-1; i < size; i = i + dim){ map[i] = 0; }		

		return map;
    }
}

/* SORTING FUNCTIONS */
function compare(a,b) {
  if (isNaN(b.fitness) || isNaN(b.fitness)) return -1;
  if (a.fitness < b.fitness) return 1;
  if (a.fitness > b.fitness) return -1;
  return 0;
}