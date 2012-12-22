// flags for allowing multiple matches and displaying relevant messages
var keepMatch = true; //to store row, if user choose same option  more than one time, 
var msgMatchMode = true;
var chosenDiv = "";

function attachInitEvent(){
	var allDivs = document.getElementsByTagName("div");
	for(var i=0; i<allDivs.length; i++){
		if(hasWord(allDivs[i].className, 'qLeft') || hasWord(allDivs[i].className, 'aRight')){
			allDivs[i].onmouseover = addHoverClass;
			allDivs[i].onmouseout = delHoverClass;
			allDivs[i].onclick = shiftChosenClass;
		}
	}
	document.onkeydown = checkKeycode;
}

function addHoverClass(){
	if(document.getElementById(this.id + 'Text').childNodes.length == 0){
		return false;
	}else if (this != chosenDiv) {
		this.className += " mightmatch";
	}
}

function shiftChosenClass(){
	if(document.getElementById(this.id + 'Text').childNodes.length == 0){
		return false;
	}else if(chosenDiv != ""){
		chosenDiv.className = removeWord(chosenDiv.className, 'chosen');
		if((hasWord(chosenDiv.className, 'qLeft') && hasWord(this.className, 'aRight')) || (hasWord(chosenDiv.className, 'aRight') && hasWord(this.className, 'qLeft'))){
		
		//for store rows of chosendDiv
		var div1Tbl = document.getElementById(chosenDiv.id + "Table");
		var div1TblRows = div1Tbl.getElementsByTagName("tr");
		
		//for store rows of this div
		var div2Tbl = document.getElementById(this.id + "Table");
		var div2TblRows = div2Tbl.getElementsByTagName("tr");

			// Check if already matched to each other
			if((div1TblRows.length>1) &&((div2TblRows.length>1))){
				for(var i=0; i<div1TblRows.length; i++){
					if(div1TblRows[i].name == this.id){
						chosenDiv = "";
						return false;
					}
				}
			}
			
			// Check if already have some other matches and the user wants to continue
			if((div1TblRows.length>1) || ((div2TblRows.length>1))){
				var keepPrevMatch = confirm("Do you want to keep previous match?\n if yes then press Ok otherwise press Cancel");
				
				if(keepPrevMatch != true){
					chosenDiv = "";
					return false; //the function will be end when the user choose cancel button
				}
			}
						
			insertMatches(chosenDiv, this);				
			chosenDiv = "";
			this.className = removeWord(this.className, 'mightmatch');
			return false;
		}
	}
	
	this.className += " chosen";
	chosenDiv = this;
	return true;
}

//to checking if user press escape after user slect the some option
function checkKeycode(e){
	var keycode;
	if (window.event){ // IE
		keycode = window.event.keyCode;
	}else if(e){  // FF
		keycode = e.which;
	}	
	if(chosenDiv != ""){	
		if(keycode == 27){
			chosenDiv.className = removeWord(chosenDiv.className, 'chosen');
			chosenDiv = "";
			moreOpt = false;
		}
	}
}


function insertMatches(div1, div2){
	var tbl1 = document.getElementById(div1.id + 'Table');
	var tbl1Rows = tbl1.getElementsByTagName('tr');

	var tbl2 = document.getElementById(div2.id + 'Table');
	var tbl2Rows = tbl2.getElementsByTagName('tr');
	
	var row1 = document.createElement('tr');
	row1.id = div1.id + 'r' + tbl1Rows.length;
	row1.name = div2.id;
	row1 = tbl1.appendChild(row1);
	
	var row2 = document.createElement('tr');
	row2.id = div2.id + 'r' + tbl2Rows.length;	
 	row2.name = div1.id;
	row2 = tbl2.appendChild(row2);
	
	var tempHTML = '<td id="' + row1.id + 'Match"></td>';
	tempHTML += document.getElementById(div2.id + 'Index').innerHTML;
	tempHTML += '<td id="' + row1.id + 'unMatch">';
	tempHTML += '<input type="button"  id="' + row1.id + 'input" name="' + row2.id + '" value="X" /></td>';
    
	tempHTML += '<td id="' + row1.id + 'sign" class="sign"></td>';
	row1.innerHTML = tempHTML;	
	
	tempHTML = '<td id="' + row2.id + 'Match"></td>';
	tempHTML += document.getElementById(div1.id + 'Index').innerHTML;
	tempHTML += '<td id="' + row2.id + 'unMatch">';
	tempHTML += '<input type="button"  id="' + row2.id + 'input" name="' + row1.id + '" value="X" /></td>';
    
	tempHTML += '<td id="' + row2.id + 'sign" class="sign"></td>';
	row2.innerHTML = tempHTML;	
	document.getElementById(row1.id + 'input').onclick = delMatches;
	document.getElementById(row2.id + 'input').onclick = delMatches;
}


function delMatches(e){
	var thatTbl = document.getElementById(this.name).parentNode;
	thatTbl.removeChild(document.getElementById(this.name));
	//delete second row
	var thisRow = this.id.substring(0, (this.id.length-5));
	var thisTbl = document.getElementById(thisRow).parentNode;
	thisTbl.removeChild(document.getElementById(thisRow));
	if(!e){ //for IE
		window.event.cancelBubble = true;
	}else{ //for FF
		e.stopPropagation();
	}
	thisDiv = document.getElementById(this.id.substring(0, 7));
	//TODO START
	thisDiv.className = removeWord(thisDiv.className, 'mightmatch');		
	//FINISHED
}


function delHoverClass(){
	this.className = removeWord(this.className, 'mightmatch');
}
