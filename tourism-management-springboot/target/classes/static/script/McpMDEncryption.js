var A,B,C,D;
var d = new Array;
var numwords;

function initEncryption(inByte) {
	mdinit(inByte);
}

function md5calc() {

	var AA, BB, CC, DD, i;

	for(i=0; i < numwords/16; i++) {
	    AA = A; BB = B; CC = C; DD = D;
	    round1(i);
	    round2(i);
	    round3(i);
	    round4(i);

	    A = safe_add(A, AA);
	    B = safe_add(B, BB);
	    C = safe_add(C, CC);
	    D = safe_add(D, DD);
	}

}

function getregs() {

	var regs = [A, B, C, D];

	return regs;
}

function mdinit(inByte) {

	var newlen, endblklen, pad, i;
	var datalenbits;

	datalenbits = inByte.length  * 8;
	endblklen = inByte.length % 64;

	if (endblklen < 56) {
	    pad = 64 - endblklen;
	} else {
	    pad = (64 - endblklen) + 64;
	}
	newlen = inByte.length + pad;

	var b = new Array(newlen);
	for(i=0; i < inByte.length; i++) {
	    b[i] = inByte[i];
	}

	b[inByte.length] = 0x80;
	for (i = b.length + 1; i < (newlen - 8); i++) {
	    b[i] = 0;
	}

	for (i = 0; i < 8; i++) {
	    b[newlen - 8 + i] = (datalenbits & 0xff);
	    datalenbits >>= 8;
	}

	A = 0x67452301;
	B = -271733879;
	C = -1732584194;
	D = 0x10325476;
	numwords = newlen/4;
	d = new Array(numwords);
	for (i = 0; i < newlen; i += 4) {
	    d[i/4] = (b[i] & 0xff) + ((b[i+1] & 0xff) << 8) +
		((b[i+2] & 0xff) << 16) + ((b[i+3] & 0xff) << 24);
	}
}

function rotintlft(val, numbits) {
	return((val << numbits) | (val >>> (32 - numbits)));
}

function tohex(i) {

	var b;
	var tmpstr;

	tmpstr = "";
	for(b = 0; b < 4; b++) {
	    var tmp = (i >> 4) & 0xf;
	    var tmp2 = i & 0xf;
	    tmpstr += tmp.toString(16)
		+ tmp2.toString(16);
	    i >>= 8;
	}
	return tmpstr;
}