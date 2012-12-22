//this function checking the single class name with phrase 
function hasWord(phrase, word) {
    var phraseArr = phrase.split(' ');
    for(var i = 0; i < phraseArr.length; i++) {
        if (phraseArr[i] == word) {
            return true;
        }
    }
    return false;
}

function ansCheckArr(phrase, phrase2){
    var phraseArr = phrase.split(' ');
    var phraseArr2 = phrase2.split(' ');
    for(var i = 0; i < phraseArr.length; i++) {
		for(var j=0; j<phraseArr2.length; j++){
			if (phraseArr[i] == phraseArr2[j]) {
				return true;
			}
		}
	 }
    return false;
}


function removeWord(phrase, word){
	var phraseArr = phrase.split(' ');
	for(var i=0; i<phraseArr.length; i++){
		if(phraseArr[i] == word){
			phraseArr.splice(i, 1);
		}
	}
	phrase = phraseArr.join(' ');
	return phrase;
}

//this function is finds the space before and after the word
function trimSpace(){
	var userAns = document.getElementById("sec02qn001opt1").value;
	for(var i=0; i<userAns.length; i++){
	//through the charAt method we are checking here how many space available, the loop is running till the character is not getting
		if (userAns.charAt(i) != ' '){
			break;
		}
	}
	for(var j=userAns.length-1; j>=0; j--){
		if(userAns.charAt(j) != ' '){
			break;
		}
	}
	var CorrAns = userAns.substring(i,j+1); //through the substring method we seeing the answer between staring and enditing spacing position and doing + 1 with j because of the last charcacter is missing
	var userAnsLower = CorrAns.toLowerCase();
	return userAnsLower; //from here we are returning the answer in lower case
}