var bodyText = "";
var prevBodyText = bodyText;
var optionText = ["Start", "Go Left", "Go Right"];
var optionAddition = [
"<br>Welcome to this weird game I created. It's a fun little project I have created to hopefully have some fun with. <br>Anyways, you wake up in a long hallway. To your <a class=\"important\">left</a> looks to be a door. To the <a class=\"important\">right</a> looks to be a staircase.",
"<br>You head left down the hall.", 
"<br>You head right down the hall."
];
var optionGroups = [[0], [1,2], [], []];
var startupMessage = "Welcome to the game I made. Very descriptive I know, but this is all subject to change.<br><br>Press Start to begin.<br>";

function startup(){
	initFileReader();
	createSlections(0);
	mainLoop();
}

function mainLoop(){
	setInterval(()=>{
		updateText();
		prevBodyText = bodyText;
	}, 30/1000);
}


function updateText(){
	if(prevBodyText != bodyText){
		let body = document.getElementById("bodyTextWrapper");
		body.innerHTML = bodyText;
		body.scrollTop = body.scrollHeight;
		console.log(">> Updated Body Text");
	}
}

//CHANGE THIS TO WORK OFF A DYNAMIC ARRAY POSITION
function selectionHandler(flag){
	switch(flag){
	case 0: 
		console.log(">> Starting Game");
		removeOption(0);
		createSlections(1);
		//Add the line breaks here and make sure to scrub for html tags.
		bodyText += optionAddition[flag];
		break;
	case 1: 
		console.log(">> Go Left");
		for(var e in optionGroups[1]){
			removeOption(optionGroups[1][e]);
		}
		bodyText += optionAddition[flag];
		break;
	case 2: 
		console.log(">> Go Right");
		for(var e in optionGroups[1]){
			removeOption(optionGroups[1][e]);
		}
		bodyText += optionAddition[flag];
		break;
	}
}

function removeOption(optionNum){
	var el = document.getElementById("option" + optionNum);
	var opacity = 1.0;

	var fade = setInterval(() =>{
		if(opacity <= 0){
			el.parentNode.removeChild(el);

			clearTimeout(fade);
		}
		else {
			opacity = opacity - 0.05;
			el.style.opacity = opacity;
		}
	}, 30/1000);
}

function createSlections(setNumber){
	for(var e in optionGroups[setNumber]){
		createOption(optionGroups[setNumber][e]);
	}
}

function createOption(optionNum){
	var div = document.createElement("DIV");
	div.className = "selection";
	div.setAttribute("onclick", "selectionHandler("+optionNum+");");
	div.id = "option" + optionNum;
	div.innerHTML = ">> " + optionText[optionNum];
	div.style.opacity = 0.0;
	document.getElementById("selectionWrapper").appendChild(div);
	
	var opacity = 0;
	setTimeout(() => {
		var fade = setInterval(() => {
			if(opacity >= 1){
				clearTimeout(fade);
				
			}
			else {
				opacity = opacity + 0.05;
				div.style.opacity = opacity;
			}
		}, 30/1000);
	}, 400);
}