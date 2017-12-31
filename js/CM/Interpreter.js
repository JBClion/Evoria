const CREATE_REGEX = new RegExp(/^(CREATE\s(([1-9]?[0-9]|100))\s([0-9]?[0-5])\s(0(\.\d+)?|1(\.0+)?))$/);
const EVOLVE_REGEX = new RegExp(/^EVOLVE$/);
const PLAY_REGEX = new RegExp(/^PLAY$/);
const CLEAR_REGEX = new RegExp(/^CLEAR$/);
const STOP_REGEX = new RegExp(/^STOP$/);
const HELP_REGEX = new RegExp(/^HELP$/);


class Interpreter{

	static run(cmd){

		var toReturn = [cmd + " is not a valid command"];

		if(CREATE_REGEX.test(cmd)){
			var cmd = cmd.split(" ");
			var parameters = new Map([ ["colony", Interpreter.convert(cmd[1])],  ["elite", Interpreter.convert(cmd[2])],  ["mutation", Interpreter.convert(cmd[3])] ]); 

			App.axiom = new Axiom(parameters);
			App.research = new Research(App.axiom);

			toReturn = ["New research successfully created"];
		}

		if(EVOLVE_REGEX.test(cmd)){
			if(App.research) { 
				App.research.start();
				toReturn = ["Starting next evolution..."];
			}
		}

		if(CLEAR_REGEX.test(cmd)){
			if(App.research) {
				App.research.stopResearches();
				App.research = null;
				View.initMatrix();
				View.initChart();
				Simulator.setColony("--");
				Simulator.setElite("--");
				Simulator.setMutation("--");

				Simulator.setTimer("--");
				Simulator.setGeneration("--");
				Simulator.setBest("--");

				toReturn = ["Research successfully cleared"];
			}
		}

		if(PLAY_REGEX.test(cmd)){
			if(App.research) {
				App.research.play(App.research);

				toReturn = ["Playing best solution..."];
			}
		}

		if(STOP_REGEX.test(cmd)){
			if(App.research) {
				App.research.stopResearches();
				toReturn = ["Stopoing research..."];
			}
		}

		if(HELP_REGEX.test(cmd)){
			toReturn = 
			[
			"#> CREATE 15 5 0.05",
			"New research, population of 15, 5 elites, mutation 0.05",
			"#> EVOLVE",
			"Perform evolution", 
			"#> PLAY",
			"Play the best solution",
			"#> CLEAR",
			"Press CTRL to clear screen"		
			];
		}		

		return toReturn;
	}

	static convert(toConvert){
	    var toReturn = NaN;

	    if(Interpreter.isValidNumber(toConvert)){
	        toReturn = parseFloat(toConvert);
	    }

	    return toReturn;
	}

	static isValidNumber(toValidate){
	    return (toValidate !== null) && (isFinite(toValidate));
	}

}