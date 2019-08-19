var ts;
var randomNum;

function getEncryptedPassword() {

	setPEtimestamp(ts);
	setPErandomNum(randomNum);
	return doMD5Hashing(getPassword());
}

function getFormattedTimestamp() {

	var encryptedtimestamp = getEncryptedTimestamp();
	var formattedTimestamp = encryptedtimestamp.substring(0,2) + ":" + encryptedtimestamp.substring(2,4) + ":" + encryptedtimestamp.substring(4,6);
	return formattedTimestamp;
}

function getEncryptedTimestamp() {

		var unorderTimestamp = new Array(12);
		unorderTimestamp[0] = getPETimestamp().charAt(1);
		unorderTimestamp[1] = getPETimestamp().charAt(6);
		unorderTimestamp[2] = getPETimestamp().charAt(10);
		unorderTimestamp[3] = getPETimestamp().charAt(3);
		unorderTimestamp[4] = getPETimestamp().charAt(0);
		unorderTimestamp[5] = getPETimestamp().charAt(7);
		unorderTimestamp[6] = getPETimestamp().charAt(8);
		unorderTimestamp[7] = getPETimestamp().charAt(2);
		unorderTimestamp[8] = getPETimestamp().charAt(4);
		unorderTimestamp[9] = getPETimestamp().charAt(14);
		unorderTimestamp[10] = getPETimestamp().charAt(13);
		unorderTimestamp[11] = getPETimestamp().charAt(5);
		
		var unorderRandomNum = new Array(12);
		unorderRandomNum[0] = getPErandomNum().charAt(17);
		unorderRandomNum[1] = getPErandomNum().charAt(1);
		unorderRandomNum[2] = getPErandomNum().charAt(5);
		unorderRandomNum[3] = getPErandomNum().charAt(7);
		unorderRandomNum[4] = getPErandomNum().charAt(2);
		unorderRandomNum[5] = getPErandomNum().charAt(18);
		unorderRandomNum[6] = getPErandomNum().charAt(9);
		unorderRandomNum[7] = getPErandomNum().charAt(3);
		unorderRandomNum[8] = getPErandomNum().charAt(14);
		unorderRandomNum[9] = getPErandomNum().charAt(6);
		unorderRandomNum[10] = getPErandomNum().charAt(16);
		unorderRandomNum[11] = getPErandomNum().charAt(4);
		
		var j, k;
		var Dparm = new Array(12);
		for (var i = 0; i < 12; i++) {
			j = unorderTimestamp[i];
			k = unorderRandomNum[i];
			j = j ^ k;
			Dparm[i] = j;
		}
		
		var Eparm = new Array(6);
		
		Eparm[0] = parseInt(Dparm[0]) + parseInt(Dparm[1]);
		if(Eparm[0] > 9 || Eparm[0] < 0){
			Eparm[0] = String(Eparm[0]).charAt(1);
		}
		else{
			Eparm[0] = String(Eparm[0]);
		}
		
		Eparm[1] = parseInt(Dparm[2]) - parseInt(Dparm[3]);
		if(Eparm[1] > 9 || Eparm[1] < 0){
			Eparm[1] = String(Eparm[1]).charAt(1);
		}
		else{
			Eparm[1] = String(Eparm[1]);
		}
		
		Eparm[2] = parseInt(Dparm[11]) + parseInt(Dparm[10]);
		if(Eparm[2] > 9 || Eparm[2] < 0){
			Eparm[2] = String(Eparm[2]).charAt(1);
		}
		else{
			Eparm[2] = String(Eparm[2]);
		}
		
		Eparm[3] = parseInt(Dparm[8]) - parseInt(Dparm[9]);
		if(Eparm[3] > 9 || Eparm[3] < 0){
			Eparm[3] = String(Eparm[3]).charAt(1);
		}
		else{
			Eparm[3] = String(Eparm[3]);
		}
		
		Eparm[4] = parseInt(Dparm[7]) - parseInt(Dparm[6]);
		if(Eparm[4] > 9 || Eparm[4] < 0){
			Eparm[4] = String(Eparm[4]).charAt(1);
		}
		else{
			Eparm[4] = String(Eparm[4]);
		}
		
		Eparm[5] = parseInt(Dparm[5]) + parseInt(Dparm[4]);
		if(Eparm[5] > 9 || Eparm[5] < 0){
			Eparm[5] = String(Eparm[5]).charAt(1);
		}
		else{
			Eparm[5] = String(Eparm[5]);
		}
		
		return Eparm.join("");
}

function getTimestamp() {
	if (ts == null)
		ts = "";
	return ts;
}

function setTimestamp() {

	var nowa = new Date();
	var fullYear = nowa.getFullYear();
	var aMonth = nowa.getMonth() + 1;
	//Seeker@20131008 O054 beg
	if(aMonth < 10){
		aMonth = "0" + aMonth;
	}else {
		aMonth = "" + aMonth;
 	}
	//Seeker@20131008 O054 end
	
	var dd = nowa.getDate();
	if(dd < 10){
		dd = "0" + dd;
	}
	
	var hh = nowa.getHours();
	if(hh < 10){
		hh = "0" + hh;
	}
	
	var mm = nowa.getMinutes();
	if(mm < 10){
		mm = "0" + mm;
	}
	
	var ss = nowa.getSeconds();
	if(ss < 10){
		ss = "0" + ss;
	}
	
	ts = fullYear + aMonth + (Math.floor(Math.random()*10)).toString() + dd + hh + mm + ss;
}
 
 function getRandomNum2(){
	 var tempArr = new Array(getRandomNum().length);
	 tempArr[0] = randomNum.charAt(4);
	 tempArr[1] = randomNum.charAt(5);
	 tempArr[2] = randomNum.charAt(6);
	 tempArr[3] = randomNum.charAt(7);
	 tempArr[4] = randomNum.charAt(8);
	 tempArr[5] = randomNum.charAt(0);
	 tempArr[6] = randomNum.charAt(1);
	 tempArr[7] = randomNum.charAt(2);
	 tempArr[8] = randomNum.charAt(3);
	 tempArr[9] = randomNum.charAt(15);
	 tempArr[10] = randomNum.charAt(16);
	 tempArr[11] = randomNum.charAt(14);
	 tempArr[12] = randomNum.charAt(17);
	 tempArr[13] = randomNum.charAt(18);
	 tempArr[14] = randomNum.charAt(9);
	 tempArr[15] = randomNum.charAt(10);
	 tempArr[16] = randomNum.charAt(11);
	 tempArr[17] = randomNum.charAt(12);
	 tempArr[18] = randomNum.charAt(13);
	 
	 return tempArr.join("");
 }
 
 function getRandomNum() {
		if (randomNum == null)
			randomNum = "";
		return randomNum;
	}

function setRandomNum() {
	 randomNum == null;
	 for(var i=0; i<19; i++){
		 if(randomNum == null){
			 randomNum = (Math.floor(Math.random()*10)).toString();
		 }
		 else{
			 randomNum = randomNum + (Math.floor(Math.random()*10)).toString();
		 }
	}
}

