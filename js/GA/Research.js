class Research{

	constructor(axiom){
		this.axiom = axiom;

		this.isActive = false;
		this.studies = this.generateStudies();
		this.evaluated = new Array();
		this.workers = new Array();
		this.bestStudy;
		this.bestFitness = 0;
		this.moveIndex = 0;
		this.interval;
		this.chart = new Array();
		this.generation = 0;

		this.startTime;
		this.duration = 0;

		Simulator.updateParameters(this.axiom);
		Simulator.setGeneration(this.generation);

		View.updateSimulator(this.axiom.map);
		View.initChart();
	}

	generateStudies(){
		var toReturn = new Array();

		for(var i = 1; i <= this.axiom.colony; i++){
			var genotype = Tools.createGenome(this.axiom.genotypeSize); 
			toReturn.push(new Study(this.axiom, genotype));
		}

		return toReturn;
	}

	start(){
		this.startTime = new Date();
		this.launchStudies();
	}

	launchStudies(){
		for(var i = 0; i < this.studies.length; i++){ 
			this.work(this.studies[i]); 
		}
	}

	work(study){
		var self = this;
		var worker = new Worker("js/GA/Evaluator.js");
		worker.addEventListener('message', function(e) { self.aggregate(e.data); this.terminate(); }, false);
		worker.postMessage(study);
		this.workers.push(worker);
	}

	aggregate(study){ 

		this.evaluated.push(study);

		if(this.evaluated.length >= this.studies.length){
			
			this.studies = Tools.sort(this.evaluated);
			this.evaluated = new Array();

			var best = this.studies[0];

			for (var i = 0; i < this.studies.length; i++) {
				this.addToChart(this.studies[i].fitness);
			}		
			
			Simulator.updateChart(this.chart);

			if(best.fitness >= 100 || best.fitness > this.bestFitness){
				this.bestStudy = this.studies[0];
				this.bestFitness = this.bestStudy.fitness;
				Simulator.setBest(this.bestFitness.toFixed(2));
				Shell.notify("New evolution match: " + this.bestFitness.toFixed(2) + "%");
				this.stopResearches();
			}else{
				this.studies = Evolution.evolve(this.axiom, this.studies);
				this.generation++;
				Simulator.setGeneration(this.generation);

				this.launchStudies();				
			}
		}
	}

	play(self){
		View.updateSimulator(self.axiom.map);
		this.interval = setInterval(function(){self.animate(self)}, 200);
	}

	animate(self){

		if(self.bestStudy){
			var bestMoves = self.bestStudy.movements;
			if(self.moveIndex+1 < bestMoves.length){
				var o = bestMoves[self.moveIndex];
				var n = bestMoves[self.moveIndex+1];
				self.moveIndex++;
				View.updatePlayer(o, n);
			}else{
				self.moveIndex = 0;
				clearInterval(self.interval);
			}
		}
	}

	addToChart(value){
		if(this.chart.length > 90){
			this.chart.shift();
		}

		this.chart.push(value);
	}

	stopAllWorkers(){
		for (var i = 0; i < this.workers.length; i++) {
			if(this.workers[i]){ this.workers[i].terminate(); }
		};
		this.workers = new Array();
	}

	stopResearches(){
		this.duration += (((new Date() - this.startTime) % 60000) / 1000);
		this.stopAllWorkers();

		Simulator.setTimer(this.duration.toFixed(2) + " sec");
	}
}