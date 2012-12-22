//this function to display the different section like sectiion one, and two
var currSecLink = null; //here's the storing removing link currently
var currSecId ='';  //HERE' THE STORE THE ID OF SECTION LIKE sec01
function swapSecLink(secId){
    var preListItem = null;
    var currListItem = null;
    if(currSecId != ''){
        prevListItem = getElement('nav0' + currSecId +'li');
	    prevListItem.removeChild(prevListItem.firstChild);
        prevListItem.insertBefore(currSecLink, prevListItem.firstChild);
    }
    currSecId = secId;
    currListItem = getElement('nav0' + currSecId +'li');
    currListItem.style.color = "red";
    currListItem.style.fontSize = "20px";
	
    currSecLink = currListItem.removeChild(currListItem.firstChild);
    navTextNode = document.createTextNode(currSecLink.innerHTML);
    currListItem.insertBefore(navTextNode, currListItem.firstChild);
}
//getElement funtion is made for document.getElementById();
function getElement(id){
	var object = document.getElementById(id);	
	return object;
}

//this function is run when the page is being onload
function firstDispHome(secId, navId){
	//to set event handler on various anchor on navigation bar
	var nav = getElement(navId);
	var secAnchr = nav.getElementsByTagName('a');
	for(var i=0; i<secAnchr.length; i++){ 
		if(secAnchr[i].className == 'secAnchr'){
			getElement(secAnchr[i].id).onclick = displaySec;
		}
	}
	swapSecLink(secId);	//for delete under line of current link on navigation bar
	
    var allDivs = document.getElementsByTagName("div");    
	for(var i=0; i<allDivs.length; i++){
		if(hasWord(allDivs[i].className, 'section')){
		   if(allDivs[i].id == secId ) {
			   allDivs[i].style.display = "block";
			}else{
				allDivs[i].style.display = "none";
			}
		}
	}
}    

//this function run when the user cilck on paticular section
function displaySec(){
	var secId = this.id.substring(4, (this.id.length-3));
	swapSecLink(secId);
	section = getElement(secId);
	var secSubInput = section.getElementsByTagName('input');
	for(var j=0; j<secSubInput.length; j++){ //to set onclick on submit button
		if(secSubInput[j].className == 'subAnswer'){
			getElement(secSubInput[j].id).onclick = processQn;
		}
	}
	var allDivs = document.getElementsByTagName("div");    
    for(var i=0; i<allDivs.length; i++){
        if(hasWord(allDivs[i].className, 'section')){
            if(allDivs[i].id == secId){
				if(!hasWord(allDivs[i].className, 'summTbl')){
					allDivs[i].className += " summTbl";
				}
                allDivs[i].style.display = "block";
				insertSummTbl(allDivs[i].id);
                // always true except at the very start, perhaps move to init
            }else{
				allDivs[i].style.display = "none";
            }
            if((allDivs[i].id == "sec0") || (secId == "sec0")){
	            continue;//from here we are continuing the for loop for div's id which class name is section
            }
			if((secId == "sumAll") && allDivs[i].id != secId && hasWord(allDivs[i].className, 'summTbl')){//if user click on sum all section
                moveTableCells(allDivs[i].id + "qnrow", "summ" + allDivs[i].id + "qnrow" );
                moveTableCells(allDivs[i].id+ "scorerow", "summ" + allDivs[i].id + "scorerow" );
	        }else if(secId == allDivs[i].id){ //if use click on section 1 or 2 not sumall
                moveTableCells("summ" + allDivs[i].id + "qnrow", allDivs[i].id + "qnrow");
                moveTableCells("summ" + allDivs[i].id + "scorerow", allDivs[i].id+ "scorerow" );
            }
		}
	}
	
	//to set on click on anchor of header of table
	var tblHdrAnchr = section.getElementsByTagName('a');
	for(var i=0; i<tblHdrAnchr.length; i++){
		if(tblHdrAnchr[i].className == 'qnCheck'){
			getElement(tblHdrAnchr[i].id).onclick = displayQn;
		}
	}
}

//insert complete table
function insertSummTbl(secId){
	if(secId != 'sec0' && secId != 'sumAll'){
	var scrSumDiv  = getElement(secId + 'SumRes');
		if(scrSumDiv.childNodes.length == 0){
			var scoreTbl = '<table border="1" id="' + secId + 'SumTab" class="sumTable">';
			scoreTbl += '<tr>';
			scoreTbl += '<th rowspan="2" ></th>';
			scoreTbl += '<th colspan="4" align="center">Attempted</th>';
			scoreTbl += '<th>Not<br />Attempted</th>';
			scoreTbl += '<th>Total</th>';
			scoreTbl += '</tr>';
			scoreTbl += '<tr id="'+ secId + 'ScrHdr ">';
			scoreTbl += '<th><a href="#" id="' + secId +'correctAncr" class="qnCheck" name="correct">Correct</a></th>';
			scoreTbl += '<th><a href="#" id="' + secId +'ptCorrectAncr" class="qnCheck" name="ptCorrect">ptCorrect</a></th>';
			scoreTbl += '<th><a href="#" id="' + secId +'inCorrectAncr" class="qnCheck" name="inCorrect">inCorrect</a></th>';
			scoreTbl += '<th><a href="#" id="' + secId +'attTotalAncr" class="qnCheck" name="attTotal">Total</a></th>';
			
			scoreTbl += '<th><a href="#" id="' + secId +'notAttTotalAncr" class="qnCheck" name="notAttTotal">Total</a></th>';
			scoreTbl += '<th> </th>';
			scoreTbl += '</tr>';
		
			scoreTbl += '<tr id="' + secId + 'qnrow">';
			scoreTbl += '<th>Questions</th>';
			scoreTbl += '<td id="' + secId+ 'qnCorr">  </td>';
			scoreTbl += '<td id="' + secId+ 'qnPtCorr">  </td>';
			scoreTbl += '<td id="' + secId+ 'qnInCorr">  </td>';
			scoreTbl += '<td id="' + secId+ 'qnTotAtt">  </td>';
			scoreTbl += '<td id="' + secId+ 'qnTotNAtt">  </td>';
			scoreTbl += '<td id="' + secId+ 'qnTotQns">  </td>';
			scoreTbl += '</tr>';
		
			scoreTbl += '<tr id="' + secId + 'scorerow">';
			scoreTbl	+= '<th >Score/M-Mark</th>';
			scoreTbl += '<td id="' + secId+ 'ScoreCorr">  </td>';
			scoreTbl += '<td id="' + secId+ 'ScorePtCorr">  </td>';
			scoreTbl += '<td id="' + secId+ 'ScoreInCorr">  </td>';
			scoreTbl += '<td id="' + secId+ 'ScoreTotAtt">  </td>';
			scoreTbl += '<td id="' + secId+ 'ScoreTotNAtt">  </td>';
			scoreTbl += '<td id="' + secId+ 'ScoreTotMarks">  </td>';
			scoreTbl += '</tr>';
			scoreTbl += '</table>';
			scrSumDiv.innerHTML = scoreTbl;	
		}
	putMarks(secId); //calling for inserting marks inside the table	
	}
	if(secId == 'sec02'){
		for(var i=1; i<=5; i++){
			var selDiv = getElement(secId + 'qn002sel' + i);
			var selOpt ='<label id="'+secId + 'qn002lab' + i +'">Question' + i +  ' </label>';
			//sec1qn002opt1
			selOpt += '<select id="' + secId + 'qn002opt' +i +'">';
			for(var j=0; j<=5; j++){
				if(j==0){
					 selOpt += '<option value="'+ j + '">Select the answer </option>';
				}else{
					selOpt += '<option value="'+ j + '">Answer' + j + '</option>';
				}
			}
			selOpt += '</select>';
			selOpt += '<span id="' + secId + 'qn002opt' + i + 'fdbkimg"></span>';
			selDiv.innerHTML = selOpt;
		}
	}
}

function putMarks(sec){
    getElement(sec + 'qnTotQns').innerHTML = 2;
    getElement(sec + 'qnTotNAtt').innerHTML = 2; 
    if(sec == 'sec01'){
		getElement(sec + 'ScoreTotNAtt').innerHTML = 6   ;
		getElement(sec + 'ScoreTotMarks').innerHTML = 6 + "/" + 6;	
	}else if((sec == 'sec02') ||(sec == 'sec03')){
		getElement(sec + "ScoreTotNAtt").innerHTML = 9;
		getElement(sec + "ScoreTotMarks").innerHTML = 9 + "/" +9;
	}
}

function moveTableCells(srcRowId, destRowId){
	allTds = getElement(srcRowId).getElementsByTagName('td');
    dest = getElement(destRowId);
    while(allTds.length){
        dest.appendChild(allTds[0]);  //appending tds how ever it have long
    }
}

var totalScore = 0;
var secScore = new Array();    //to store the diffrent score for different sections when u click on sec01 s

//this all arguments which is variables store it's own value like maxMarks argument contain defined number from evalQuestion()
function evalMultiChoice(qnId,answer,maxMarks){
    var userInput = false;
    var question = getElement(qnId); 
    var score = 0; 
    var multiAnsInputs = question.getElementsByTagName("input");
	for(var i=0; i<multiAnsInputs.length; i++){
        if(multiAnsInputs[i].type == "radio" ){
            if(multiAnsInputs[i].checked == true){
                userInput = true;
                var imgResultId = multiAnsInputs[i].id + 'fdbkimg'; //to display the right check mark
                if(multiAnsInputs[i].id == answer){
                    score += maxMarks;
                    getElement(imgResultId).innerHTML = "<img src='images/correct.gif'>";    
                }else{
                    score = 0;
                    getElement(imgResultId).innerHTML = "<img src='images/incorrect.gif'>";
                    //qnInCorrNum += 1;
				}
            } 
        }
    }
    
    if(userInput == true){
        for(var j=0; j<multiAnsInputs.length; j++){
            multiAnsInputs[j].disabled=true;
        }
        return score;    
    }else{
        return null; //the null is define here instead above at else condtion because the radio buttons is more than one
    }        
}

//this function making the score with check boxs
//this all arguments which is variables store it's own value like answer argument contain it's score of particular section
function evalMultiAnswer(qnId,answer,maxMarks){
    var userInput = false;
    var question = getElement(qnId); 
    var multiAnsInputs = question.getElementsByTagName("input");
    var score = 0;
    var ansCorArray = answer.split(" ");
    var optScore = maxMarks/ansCorArray.length;
    for(var i=0; i<multiAnsInputs.length; i++){
        if(multiAnsInputs[i].type == "checkbox" ){
            if(multiAnsInputs[i].checked == true){
                userInput = true;
                var imgResultId = multiAnsInputs[i].id + 'fdbkimg'; //make id to display the  check mark
				
                var found = false;
                for(var j=0; j<ansCorArray.length; j++){
                    //to check that the are these ids  same? 
                    if(multiAnsInputs[i].id == ansCorArray[j]){ 
                        found = true; // if ids are same than we set found true 
                    }
                }
                if(found == true){
                    score += optScore;
                    getElement(imgResultId).innerHTML = "<img src='images/correct.gif'>";    
                    //qnCurrScore += 1;
                }else{
                    score -= optScore;
                    getElement(imgResultId).innerHTML = "<img src='images/incorrect.gif'>";    
                    //qnInCurrScore += 1;
                }
            }
        }
    }
    //return score
    //return userInput 
    //If we  done like above two comment line,  the score will return in that time also when the userInput is return null because score is returning from outside of loop and userInput null defined the inside the loop here now the score return only when the userInput is not null it means user clicked, and userInput run onlyWhen if userInput is null that means user check nothing and do submit
    if(userInput == true){
        for(var j=0; j<multiAnsInputs.length; j++){
                multiAnsInputs[j].disabled=true;
        }    
        return score;
    }else{
        return null; //the null is define here instead above at else condtion because the check box is more than one
    }
}

//this function makes the score with select
//this all arguments which is variables store it's own value like qnId argument contain id question like sec01qn001 from evalQuestion()
function evalMatchAnswer(qnId,answer,maxMarks){
    var userInput = false;
    var score = 0; 
    var question = getElement(qnId); 
    var allSelect = question.getElementsByTagName("select");
    var selScore = maxMarks/allSelect.length;
    for(var i=0; i<allSelect.length; i++){
        var selectId = allSelect[i].id;
        //to get last character of select Id eg 1 of sel1
        var selectIdNum = selectId.charAt(selectId.length-1);
        //to get the character of answer eg first charater is x second  is 1 on particular select  tag of selectIdNum eg 1
        var ansString = answer.charAt(selectIdNum); //ansIndex instead of ansString
		
        var selectItem = allSelect[i]; //to define the select item for extras the selected value
        var selOption = selectItem[selectItem.selectedIndex];
        var imgResIdSel = selectItem.id + "fdbkimg";
	    var selValue = selOption.value;
		
    //here if contion set for value 0 because if user doesn't choose anything in this case the incorrect image     should not be display
            if(selValue == 0){            
            }else{
                userInput = true;
                if(ansString == selValue){
                    score += selScore;
                    getElement(imgResIdSel).innerHTML = "<img src='images/correct.gif'>";    
                }else{
                    getElement(imgResIdSel).innerHTML = "<img src='images/incorrect.gif'>";    
                }
            }
        }
        
    if(userInput == true){ 
        for(var j=0; j<allSelect.length; j++){
            allSelect[j].disabled=true;
        }
        return score;
    }else{
        return null;
    }
}

//this function start for short type question
function evalShortAnswer(qnId, answer,maxMarks){
    var score = 0;
    var userInput = false;
    if(getElement("sec02qn001opt1").value){
        getElement("sec02qn001opt1").disabled = true;
        userInput = true;
        userAnsLower = trimSpace();
        if(userAnsLower == answer){
            score += maxMarks;
            getElement("sec02qn001opt1fdbkimg").innerHTML = "<img src='images/correct.gif'>";    
        }else{
            getElement("sec02qn001opt1fdbkimg").innerHTML = "<img src='incorrect.gif'>";
        }    
        return score;
    }else{
        return null;
    }
}
    

//this function is created for counting qn and score of particular section
function findQnMark(secId){
    var qnCount = 0;
    var qnMarks = 0;
   var sec = getElement(secId);
   var divsInSec = sec.getElementsByTagName('div');
     for(var i=0; i<divsInSec.length; i++){
        if(hasWord(divsInSec[i].className, 'question')){
          qnCount++;
          qnMarks += eval(getElement(divsInSec[i].id + "max").value);
         }
    }
return [qnCount, qnMarks];   
}

//this array created for particular section like sec01 and sec02
var secData = new Array();

function updateData(secNum, question, qnScore, maxMarks){
   var secId = "sec" + secNum;
    //for maximum number of question on which the user have clicked
    var  countQnScore = findQnMark(secId);
    
    if(secData[secNum] == null){
        secData[secNum] = new Object();
        secData[secNum].qn = new Object();
        secData[secNum].qn.Att = 0;
        secData[secNum].qn.Corr = 0;
        secData[secNum].qn.inCorr = 0;
        secData[secNum].qn.ptCorr = 0;
        secData[secNum].qn.notAtt = countQnScore[0];
    
        secData[secNum].score = new Object();
        secData[secNum].score.Att = 0;
        secData[secNum].score.Corr = 0;
        secData[secNum].score.inCorr = 0;
        secData[secNum].score.ptCorr = 0;
        secData[secNum].score.notAtt = countQnScore[1];
        secData[secNum].score.inCorrMmark = 0;
        secData[secNum].score.CorrMmark = 0;
        secData[secNum].score.AttMmark = 0;
        }
      secData[secNum].qn.Att += 1;
      secData[secNum].qn.notAtt -= 1;
      secData[secNum].score.notAtt -= maxMarks; 
      secData[secNum].score.AttMmark += maxMarks;
      if(secData[9] == null){
        secData[9] = new Object();
        secData[9].total = new Object();
        secData[9].total.qn = new Object();
        secData[9].total.qn.Att = 0;
        secData[9].total.qn.Corr = 0;
        secData[9].total.qn.inCorr = 0;
        secData[9].total.qn.ptCorr = 0;
        secData[9].total.qn.notAtt = 4;
        
        secData[9].total.score = new Object();
        secData[9].total.score.Att = 0;
        secData[9].total.score.Corr = 0;
        secData[9].total.score.inCorr = 0;
        secData[9].total.score.ptCorr = 0;
        secData[9].total.score.notAtt = 15;
        secData[9].total.score.AttMmark = 0;
        secData[9].total.score.PtMmark = 0;
       }
     
      secData[9].total.qn.Att += 1;
      secData[9].total.qn.notAtt -= 1;
      secData[9].total.score.notAtt -= maxMarks; 
      secData[9].total.score.AttMmark += maxMarks;
     
   if(qnScore <= 0 ){
    //for calulate question of number
        secData[secNum].qn.inCorr += 1;
        //for calculate score
        secData[secNum].score.Att += qnScore;
        secData[secNum].score.inCorr += maxMarks;
        secData[secNum].score.inCorrMmark += maxMarks; 
      //for calculate total question and score
        secData[9].total.qn.inCorr += 1;
        secData[9].total.score.Att += maxMarks;
        secData[9].total.score.inCorr += maxMarks;
        
        question.className += " inCorrect";
        question.className += " attTotal";
        
     }else if(qnScore == maxMarks){
    //for calulate question of number
      secData[secNum].qn.Corr += 1; 
      secData[secNum].score.Att += maxMarks;
      //for calculate score
      secData[secNum].score.Corr += maxMarks;
      secData[secNum].score.CorrMmark += maxMarks;
      question.className += " correct";
	  question.className += " attTotal";
     
    } else if(qnScore > 0 && qnScore < maxMarks){
        //for calulate question of number
        secData[secNum].qn.ptCorr += 1;
        //for calculate score
        secData[secNum].score.Att += qnScore;
        secData[secNum].score.ptCorr += qnScore;
        //for calculate total question and score
        secData[9].total.qn.ptCorr += 1;
        secData[9].total.score.Att += qnScore;
        secData[9].total.score.ptCorr += qnScore;
        secData[9].total.score.PtMmark += maxMarks;
        question.className += " ptCorrect";
		question.className += " attTotal";
    }
}

//display particular question when user click on paritcular option of header inside the table
function displayQn(){
	secId = this.id.substring(0, 5);
	condition = this.name;
    var section = getElement(secId);
    var secDivs = section.getElementsByTagName('div');
    for(var i=0; i<secDivs.length; i++){
        if(hasWord(secDivs[i].className, 'question')){
	         if(hasWord(secDivs[i].className, condition)){
				getElement(secDivs[i].id).style.display = "block";
		     }else{
				getElement(secDivs[i].id).style.display = "none";
             }
			 //display that question which is not attempted by user
			 if((condition == 'notAttTotal') && !hasWord(secDivs[i].className, 'attTotal')){
				getElement(secDivs[i].id).style.display = "block";
			 }
        }
    }
}
 
//this is the master function
function processQn(){  // processQn is made for evalQuestion
	var secNum = this.id.substring(3, 5);
	var qnNum = this.id.substring(this.id.length-3);
	var answer = this.name;
    var qnId = 'sec'+ secNum + 'qn' + qnNum;
	
    var question = getElement(qnId); //it extracts the id of questions eg sec01qn001    
    var maxMarks = Number(getElement(qnId+'max').value);
    var multiAnsInputs = question.getElementsByTagName("input");
    //the vairable defined for totals score of each question
    
    //at start secScore is null so we set it at 0 to store diffrent section score otherwise it would be null
    if (secScore[secNum] == null){
        secScore[secNum] = 0;
    }
    //element of question like divsec01

    if(hasWord(question.className, "multichoice")){
    //on getScore variable we have store the value of score which is used on different functions
    //here we are passing multiple arguments beause this all variable needs for each function
    var qnScore = evalMultiChoice(qnId,answer,maxMarks);
    }else if(hasWord(question.className, 'multiAnswer')){
        qnScore = evalMultiAnswer(qnId, answer,maxMarks);
    }else if(hasWord(question.className, 'matching')){ //here's teh new script begin 
        qnScore = evalMatchAnswer(qnId, answer,maxMarks);
    }else if(hasWord(question.className, 'shortAnswer')){
        qnScore = evalShortAnswer(qnId, answer,maxMarks);
    }else if(hasWord(question.className, 'multiMatches')){
		qnScore = evalMultiMatches(secNum, qnId, maxMarks);
	}
    //e can break the function from here and we can change max mum marks, qnscore, secNum qnNumber
    if(qnScore == null){
        return null; //to end function like multiChoice, multiAnswer and matchAnswer if qnScore is null
    }    
    if(qnScore <= 0 ){ //to less than for to set negative value to 0, less than = set for string result
        qnScore = 0;
    }
    secScore[secNum] += qnScore;
    totalScore += qnScore;
    updateData(secNum, question, qnScore, maxMarks); //instead table score
    updateDisp(secNum, qnNum, question,   qnScore, maxMarks);  //created new function
}

function evalMultiMatches(secNum, qnId, maxMarks){
	var userInput = false;
	var corrAns = false;
	var score = 0;
	var ansLength = 0;
	var qnDiv = getElement(qnId);
	var qnAllDivs = qnDiv.getElementsByTagName('div');
	for(var i=0; i<qnAllDivs.length; i++){ //to check how many question available there
		if(hasWord(qnAllDivs[i].className, 'qLeft')){
			ansLength += ansArr(qnAllDivs[i].className);
		}
	}
		
	var divScore = maxMarks/ansLength; //there is 5 number of div
	var tblsId;
	for(i=1; i<=2; i++){ // to checking answer and question
		for(var j=1; j<=5; j++){ //to checking how many tables inside either qn or ans
		if(i==1){
			 tblsId = getElement('sec' + secNum + 'q' + j + 'Table');
		}else{
			 tblsId = getElement('sec' + secNum + 'a' + j + 'Table')
		}
			var tblsRows = tblsId.getElementsByTagName('tr');
			for(var k=0; k<tblsRows.length; k++){
				if(k>0){
					userInput = true;
					var unMatchButt = getElement(tblsRows[k].id + 'input');
					var qnDivId = tblsRows[k].id.substring(0, 7);
					var ansDivId = tblsRows[k].name.substring(0, 7);
					if(ansCheckArr(getElement(ansDivId).className, getElement(qnDivId).className)){
						getElement(tblsRows[k].id + 'sign').innerHTML = "<img src='images/correct.gif'>";
						if(i==1){
							corrAns = true;
							score += divScore;
						}
					}else{
						if(i==1){
							score -= divScore;
						}
						getElement(tblsRows[k].id + 'sign').innerHTML = "<img src='images/incorrect.gif'>";
					}
				}
			}
		}
	}

	if(userInput == true){
		for(var i=0; i<qnAllDivs.length; i++){
			if(hasWord(qnAllDivs[i].className, 'qLeft') || hasWord(qnAllDivs[i].className, 'aRight')){
				qnAllDivs[i].onmouseover = null;
				qnAllDivs[i].onmouseout = null;
				qnAllDivs[i].onclick = null;
			}	
		}
		var allInputs = qnDiv.getElementsByTagName('input');
		for(var i=0; i<allInputs.length; i++){
			if(allInputs[i].type == 'button'){
				allInputs[i].disabled = true;
			}
		}
        
       return score;
	}else{
		return null;	
	}
}

function ansArr(answers){
	var mixAnsNum = answers.split(' ');
	for(k = 0; k<mixAnsNum.length; k++){
	}
	return(k-1);
}


function updateDisp(secNum, qnNum, question, qnScore, maxMarks){ 
    var  secId = "sec" + secNum;
    var navSecScoreAreaId = 'nav0sec' + secNum + 'score';
    var qnId = 'sec'+ secNum + 'qn' + qnNum;
    var resultArea = getElement(qnId+'result');
    var resultStr ="";
    if(qnScore <= 0 ){ //to less than for to set negative value to 0, less than = set for string result
        //here we direcet put the qnScore and maxMarks instead of gotScore because qnScore = 0,  defined after it,
        //if we don't do that the qnScore would be negative but the qnScore is same
        resultStr = '<img src="images/incorrect.gif">' + " It's not correct " + qnScore + "/" + maxMarks;
        getElement(secId +"qnInCorr").innerHTML = secData[secNum].qn.inCorr; 
        getElement(secId +"ScoreInCorr").innerHTML = secData[secNum].score.inCorr  + "/" + secData[secNum].score.inCorrMmark;
        getElement("sumAllqnInCorr").innerHTML = secData[9].total.qn.inCorr;
        getElement("sumAllScoreInCorr").innerHTML = secData[9].total.score.inCorr + "/" + secData[9].total.score.inCorr;
                  
    }else if(qnScore == maxMarks){
		resultStr ='<img src="images/correct.gif">' + " It's Correct " + qnScore + "/" + maxMarks;
		getElement(secId +"qnCorr").innerHTML = secData[secNum].qn.Corr;
		getElement(secId +"ScoreCorr").innerHTML = secData[secNum].score.Corr + "/"  + secData[secNum].score.CorrMmark;
      
      //to calculate total  score and question
		secData[9].total.qn.Corr += 1;
		secData[9].total.score.Att += qnScore;
		secData[9].total.score.Corr += maxMarks;
		getElement("sumAllqnCorr").innerHTML = secData[9].total.qn.Corr;      getElement("sumAllScoreCorr").innerHTML = secData[9].total.score.Corr + "/" + secData[9].total.score.Corr;
    }else if(qnScore > 0 && qnScore < maxMarks){
		resultStr = '<img src="images/partCor.gif">' + " It's partly Correct " + qnScore + "/" + maxMarks;
		getElement(secId + "qnPtCorr").innerHTML = secData[secNum].qn.ptCorr; 
		getElement(secId + "ScorePtCorr").innerHTML = secData[secNum].score.ptCorr + "/" + maxMarks; 
		getElement("sumAllqnPtCorr").innerHTML = secData[9].total.qn.ptCorr; 
		getElement("sumAllScorePtCorr").innerHTML = secData[9].total.score.ptCorr +  "/" + secData[9].total.score.PtMmark;
    }
    
    resultArea.innerHTML = resultStr;
    resultArea.style.display = 'block';
    getElement(qnId+'sub').style.display = 'none';
    getElement(navSecScoreAreaId).innerHTML = secScore[secNum];
    getElement("nav0sumAllscore").innerHTML = totalScore;
    
    //for display total attempted or not attempted of question
    getElement(secId+"qnTotAtt").innerHTML = secData[secNum].qn.Att;
    getElement(secId + "qnTotNAtt").innerHTML = secData[secNum].qn.notAtt; 
    //for display total attempted or not attempted of score
    getElement(secId +"ScoreTotAtt").innerHTML = secData[secNum].score.Att + "/" + secData[secNum].score.AttMmark;
    getElement(secId + "ScoreTotNAtt").innerHTML = secData[secNum].score.notAtt;
     
	  //for display total attempted and not attempte of questiion and score
	getElement("sumAllqnAttTot").innerHTML = secData[9].total.qn.Att;
	getElement("sumAllqnNAtt").innerHTML = secData[9].total.qn.notAtt;
	getElement("sumAllScoreNAtt").innerHTML = secData[9].total.score.notAtt;
	getElement("sumAllScoreAttTot").innerHTML = secData[9].total.score.Att + "/" + secData[9].total.score.AttMmark ; 
}