class Simulator{

	static updateResearch(research){
		Simulator.updateParameters(research);
		Simulator.updateResult(research);
	}

	static updateParameters(axiom){
		Simulator.setColony(axiom.colony);
		Simulator.setElite(axiom.elite);	
		Simulator.setMutation(axiom.mutation);
	}

	static updateResults(study){
		Simulator.setStudy(study.id);	
		Simulator.setGeneration(study.generation);
		Simulator.setBest(study.best);
	}

	static updateBacteria(bacteria){
		View.updateBacteria(bacteria);
	}

	static updateSolution(solution){
		View.updateSolution(solution);
	}

	static updateDifference(delta){
		View.updateDifference(delta);
	}


	static generateMap(dim, p){
	 	var toReturn = [];

	    for(var i = 0; i < dim; i++){ 
	        for(var j = 0; j < dim; j++){ 
	            if((i > 0 && i < (dim-1)) && (j > 0)){
	               toReturn.push((Math.random() > p) ? 0 : 1);
	            }else{
	                toReturn.push(1);
	            }
	        }
    	}

    	View.updateBacteria(toReturn)
	}

	static updateChart(scores){

		if(scores && scores.length > 0){
			for (var i = 0; i <= scores.length; i++) {
				var score = scores[i];
				Simulator.updateLineChart(i, score);
			}
		}
	}

	static updateLineChart(i, score){
		var value = parseInt(score);
		var index = 10100 + i;

		for (var i = 0; i < 90; i++) {
			if(i <= value){
				View.enablePlot(index - (101*i));
			}else{
				View.disablePlot(index - (101*i));
			}
		}
	}

	static setColony(colony){ View.setValue("colony", colony); } 
	static setElite(elite){ View.setValue("elite", elite); } 
	static setMutation(mutation){ View.setValue("mutation", mutation); } 

	static setTimer(timer){ View.setValue("timer", timer); } 
	static setGeneration(generation){ View.setValue("generation", generation); } 
	static setBest(best){ View.setValue("best", best); } 

}
