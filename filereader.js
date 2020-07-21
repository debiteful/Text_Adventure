var raw;

function initFileReader(){
	document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(event){
	const reader = new FileReader()
	reader.onload = handleFileLoad;
	reader.readAsText(event.target.files[0])
}

function handleFileLoad(event){
	console.log(event.target.result);
	raw = event.target.result;

	//All save files should be marked with MSF somewhere in the file.
	if (!raw.includes("MSF")){
		alert("Not a Save File");
	}
	else{
		
		/*
		* SYNTAX FOR SAVE FILE
		* ===========================================================
		* startupMessage 	= 	<T><T>
		* optionText 		= 	<"0"><"0"> where 0 is the index of the entry.
		* optionAddition 	= 	<'0'><'0'> where 0 is the index of the entry.
		* optionGroups		=	<:0:>1,2<:0:> where 0 is the index of the group, and 1,2 is the list of the entries separated by commas
		* ===========================================================
		* Overrides are done by the last conflicting thing in the file being chosen.
		* Important sections of the text are denoted by <!><!> and will show up as blue text.
		*/
		var buffer = raw;
		//Pulling out the startup message.
		buffer = buffer.substring(buffer.search("<T>") + 3);
		startupMessage = buffer.substring(0, buffer.search("<T>"));
		buffer = buffer.substring(buffer.search("<T>") + 3);
		buffer = buffer.trim();
		startupMessage = startupMessage.replace(/<!>/g, "<a class=\"important\">");
		startupMessage = startupMessage.replace(/<\/!>/g, "</a>");
		bodyText += startupMessage;
		
		//Start segment parting
		console.log(buffer);
		//while(buffer != "" || buffer){
			switch(buffer.charAt(1)){
				case '\"':
				console.log(buffer.charAt(1));
				
				
				break;
				case '\'':
				console.log(buffer.charAt(1));
				break;
				case ':':
				console.log(buffer.charAt(1));
				break;
			}
		//}
		
		
		
		var el = document.getElementById("gameSelectionWrapper");
		var opacity = 1.0;
		var fade = setInterval(() =>{
			if(opacity <= 0){
				el.parentNode.removeChild(el);
				clearTimeout(fade);
			}
			else {
				opacity = opacity - 0.02;
				el.style.opacity = opacity;
			}
		}, 30/1000);
	}
}