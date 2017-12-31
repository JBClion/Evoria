class View{
		
		static initialize(){

			View.UI = new Map();

			// TERMINAL UI ELEMENTS
			View.addElt("command");
			View.addElt("history");
			View.addElt("shell");

			// TERMINAL RESEARCH ELEMENTS
			
			// PARAMETERS
			View.addElt("aim");
			View.addElt("colony");
			View.addElt("elite");
			View.addElt("mutation");
			View.addElt("studies");
			
			// RESULTS
			View.addElt("isRunning");
			View.addElt("timer");
			View.addElt("study");
			View.addElt("generation");
			View.addElt("best");

			View.initMatrix();
			View.initChart();

			// TERMINAL RESEARCH ELEMENTS

		}

		static initMatrix(){
			var dim = 25;
			var index = 0;
			View.getElt('simulator').innerHTML = "";

			for(var i = 0; i < dim; i++){
				var div = View.createElt("D" + i, 'div', "line");

				for(var j = 0; j < dim; j++){
					div.appendChild(View.createElt("M" + index++, 'span', 'alive'));
				}

				View.appendElement('simulator', div);
			}
		}

		static initChart(){
			var dim = 101;
			var index = 0;
			View.getElt('chart').innerHTML = "";

			for(var i = 0; i < dim; i++){
				var div = View.createElt("C" + i, 'div', "cline");

				for(var j = 0; j < dim; j++){
					div.appendChild(View.createElt("P" + index++, 'span', 'cdead'));
				}

				View.appendElement('chart', div);
			}
		}

		static createElt(id, type, className){
			var elt = document.createElement(type);
			elt.id = id;
			elt.className = className;

			return elt;
		}

		static updateBacteria(genotype){
			View.updateSimulator("M", genotype);
		}

		static updateSolution(genotype){
			View.updateSimulator("S", genotype);
		}

		static updateDifference(genotype){
			for(var i = 0; i < genotype.length; i++){
				if(genotype[i] === '1'){
					View.getElt("S" + i).className = 'delta';
				}
			}
		}

		static updatePlayer(o, n){
			View.getElt("M" + o).className = 'dead';
			View.getElt("M" + n).className = 'player';
		}

		static enablePlot(p){
			View.getElt("P" + p).className = 'calive';
		}

		static disablePlot(p){
			View.getElt("P" + p).className = 'cdead';
		}

		static updateSimulator(genotype){

			for(var i = 0; i < genotype.length; i++){
				switch (genotype[i]){
					case 0: View.getElt("M" + i).className = 'dead'; break;
					case 1: View.getElt("M" + i).className = 'alive'; break;
					case 2: View.getElt("M" + i).className = 'player'; break;
					case 6: View.getElt("M" + i).className = 'goal'; break;
				}
			}
		}

		static appendText(id, value){
			View.setValue(id, View.getValue(id) + value);;
		}

		static scrollDown(id){
			View.getElt(id).scrollTop = View.getElt(id).scrollHeight;
		}

		static appendElement(id, elt, scroll){
			View.getElt(id).appendChild(elt);
			if(scroll) { View.scrollDown(scroll); }
		}

		static setValue(id, value){
			View.UI.get(id).innerHTML = value;
		}

		static getValue(id){
			return View.UI.get(id).innerHTML;
		}

		static addElt(id){
			View.UI.set(id, View.getElt(id));
		}

		static getElt(id){
			return document.getElementById(id);
		}

}
