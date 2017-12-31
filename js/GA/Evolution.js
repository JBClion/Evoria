const MU = new Map([['0', '1'],['1', '0']]);

class Evolution{

	static evolve(axiom, studies){
		
		studies = Tools.sort(studies);

		var elites = studies.slice(0, axiom.elite);
		var others = studies.slice(axiom.elite);

		studies = Evolution.perform(elites, others, axiom);

		return studies;
	}

	static perform(elites, others, axiom){

		var evolved = new Set();
		var limit = elites.length + others.length;
		var mutation = axiom.mutation;

		var i = 0;
		var j = 0;
		
		for (var e = 0; e < elites.length; e++) {
			evolved.add(new Study(axiom, elites[e].genotype));
		}
		

		while((evolved.size < limit) && (i < elites.length)){	
			
			while((evolved.size < limit) && (j < others.length)){
				
				var crossed = Evolution.crossover(elites[i].genotype, others[j].genotype);
				var mutated = Evolution.mutate(crossed, mutation);

				evolved.add(new Study(axiom, mutated)); 
			
				j++;

			}

			j = 0; 
			i++;
		}

		return Array.from(evolved);
	}

	static crossover(best, other){ 
		
		var bests = best.match(/.{2}/g);
		var others = other.match(/.{2}/g);

		for(var i = 0; i <= others.length; i = i + 2){
			others[i] = bests[i];
		}

		return others.join("");

	}

	static mutate(genotype, mutationProbability){ 
		
		var mutated = ""

		for(var i = 0; i < genotype.length; i++){
			
			if(Math.random() < mutationProbability){
				mutated += MU.get(genotype[i]);
			}else{
				mutated += genotype[i];
			}

		}

		return mutated;
	}

}