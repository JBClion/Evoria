var recalls = new Array();
var recallIndex = 0;

class Shell{

	static listen(){
		window.onkeydown = function(e) { Shell.handleDown(e); }
		window.onkeypress = function(e) { Shell.handlePress(e); }
	}

	static handleDown(e){

		var keyCode = e.keyCode ? e.keyCode : e.which;

		if(keyCode !== null && keyCode !== undefined){

		   	if(keyCode == 13){
		   		//Handle Return key	
				Shell.sendCommand();
			}else if(keyCode == 8){
				//Handle Backspace key
   				Shell.backspace();
   			}else if(keyCode == 32){
				//Handle Space
   				Shell.space();
			}else if(keyCode == 38){
			   	//Handle UP key	
			   	Shell.nextRecall();
			}else if(keyCode == 17){
			   	//Handle UP key	
			   	Shell.clearHistory();	   		
			}
		}
	}

	static handlePress(e){

		var keyCode = e.keyCode ? e.keyCode : e.which;

		if(keyCode !== null && keyCode !== undefined){
			View.appendText("command", String.fromCharCode(keyCode).trim().toUpperCase());
		}
	}

	static sendCommand(){
		var input = Shell.extractCommands();
		var output = Interpreter.run(input);
		Shell.notifications(output);
	}

	static extractCommands(){
		var userInput = Shell.getPrompt();

		Shell.notify(userInput);
		Shell.clearPrompt();

		Shell.addRecall(userInput);
		Shell.recallIndex = 0;

		return userInput;
	}

	static nextRecall(){
		if(recalls.length > 0){
			if(recallIndex >= recalls.length){ recallIndex = 0; }
			Shell.setPrompt(recalls[recallIndex]);
			recallIndex++;
		}
	}

	static addRecall(toSave){
		if(toSave !== null && toSave.length > 0){
			recalls.unshift(toSave);
		}
	}

	static notifications(messages){
		for (var i = 0; i < messages.length; i++) { Shell.notify(messages[i]); };
	}

	static notify(message){
		View.appendElement("history", Shell.createDiv(message), "shell");
	}

	static createDiv(data){
		var div = document.createElement('div');
		div.innerHTML = data;

		return div;
	}

	static getPrompt(){ return View.getValue("command").trim().toUpperCase(); }

	static setPrompt(data){ View.setValue("command", data); }

	static clearPrompt(){ Shell.setPrompt(""); }

	static clearHistory(){ View.setValue("history", ""); }

	static backspace(){
		var value = Shell.getPrompt();
		Shell.setPrompt(value.substring(0, value.length - 1));
	}

	static space(){
		Shell.setPrompt(Shell.getPrompt() + " ");
	}

	static getCharacter(keyCode){
	    if (keyCode >= 96 && keyCode <= 105) { keyCode -= 48; }
    	return String.fromCharCode(keyCode);
	}

}