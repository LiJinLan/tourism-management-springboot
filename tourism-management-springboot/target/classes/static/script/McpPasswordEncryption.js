var pe_ts;
var pe_randomNum;

function doMD5Hashing(passwd) {

	var offset = getOffset2W(getEncryptedPETimestamp(), passwd);
	initMD5Encryption(offset);
	md5calc();
	var md5Hash = tohex(A) + tohex(B) + tohex(C) + tohex(D);

	return md5Hash;
}

function doOffsetCalculcation(oldPassword, newPassword) {

	var offset = getOffset2W(oldPassword, newPassword);
	var offsetCalc = "";
	for (var i = 0; i < offset.length; i++) {
		var tmp = offset[i];
		var tmp2 = (tmp >> 4) & 0xf;
		var tmp3 = tmp & 0xf;
		offsetCalc += tmp2.toString(16) + tmp3.toString(16);
	}

	return offsetCalc;
}

function getEncryptedPETimestamp() {
	
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

function getFormattedPETimestamp() {

	var encryptedtimestamp = getEncryptedPETimestamp();
	var formattedTimestamp = encryptedtimestamp.substring(0,2) + ":" + encryptedtimestamp.substring(2,4) + ":" + encryptedtimestamp.substring(4,6);
	return formattedTimestamp;
}

function getOffset2W(word1, word2) {

	var offset = "";
	var w1 = "", w2 = "", w3 = "", w4 = "", w5 = "";
	var i, j, k;
	var x, y, z;

	var b1 = new Array(10), b2 = new Array(10);
	var b3 = new Array(10), b4 = new Array(10);

	w1 = word1 + "\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020";
	w2 = word2 + "\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020";

	w1 = w1.substring(0, 10);
	w2 = w2.substring(0, 10);

	word1 = w1;
	word2 = w2;

	w1 = "";
	w2 = "";

	for (i = 0; i < 10; i++) {
		w1 = w1 + a2eChar(word1.charAt(i).charCodeAt(0));
		var tmp = a2eChar(word1.charAt(i).charCodeAt(0));
		b1[i] = (tmp & 0xff);
       }
	for (i = 0; i < 10; i++) {
		w2 = w2 + a2eChar(word2.charAt(i).charCodeAt(0));
		var tmp = a2eChar(word2.charAt(i).charCodeAt(0));
		b2[i] = (tmp & 0xff);
	}

	for (i = 0; i < 10; i++) {
		j = b1[i];
		k = b2[i];
		j = j ^ k;
		b3[i] = j;
	}

	for (i = 0; i < 10; i++) {
		j = b1[i];
		k = b3[i];
		j = j ^ k;
		b4[i] = j;
	}

	return b3;
}

function getPETimestamp() {

	if (pe_ts == null)
		pe_ts = "";
	return pe_ts;
}

function setPEtimestamp(timestamp) {
	pe_ts = timestamp;
}
 
 function getPErandomNum() {
 	if (pe_randomNum == null)
 		pe_randomNum = "";
 	return pe_randomNum;
 }

 function setPErandomNum(tempRandomNum) {
 	pe_randomNum = tempRandomNum;
 }

