
function initMD5Encryption(inByte) {
	initEncryption(inByte);
}

function F(x, y, z) {
	return ((x & y) | (~x & z));
}

function G(x, y, z) {
	return ((x & z) | (y & ~z));
}

function H(x, y, z) {
	return (x ^ y ^ z);
}

function I(x, y, z) {
	return (y ^ (x | ~z));
}

function round1(blk) {

	A = rotintlft(A + F(B, C, D) + d[0 + 16 * blk] +
		      -680876936, 7) + B;
	D = rotintlft(D + F(A, B, C) + d[1 + 16 * blk] +
		      -389564586, 12) + A;
	C = rotintlft(C + F(D, A, B) + d[2 + 16 * blk] +
		      606105819, 17) + D;
	B = rotintlft(B + F(C, D, A) + d[3 + 16 * blk] +
		      -1044525330, 22) + C;

	A = rotintlft(A + F(B, C, D) + d[4 + 16 * blk] +
		      -176418897, 7) + B;
	D = rotintlft(D + F(A, B, C) + d[5 + 16 * blk] +
		      1200080426, 12) + A;
	C = rotintlft(C + F(D, A, B) + d[6 + 16 * blk] +
		      -1473231341, 17) + D;
	B = rotintlft(B + F(C, D, A) + d[7 + 16 * blk] +
		      -45705983, 22) + C;
	A = rotintlft(A + F(B, C, D) + d[8 + 16 * blk] +
		      1770035416, 7) + B;
	D = rotintlft(D + F(A, B, C) + d[9 + 16 * blk] +
		      -1958414417, 12) + A;
	C = rotintlft(C + F(D, A, B) + d[10 + 16 * blk] +
		      -42063, 17) + D;
	B = rotintlft(B + F(C, D, A) + d[11 + 16 * blk] +
		      -1990404162, 22) + C;
	A = rotintlft(A + F(B, C, D) + d[12 + 16 * blk] +
		      1804603682, 7) + B;
	D = rotintlft(D + F(A, B, C) + d[13 + 16 * blk] +
		      -40341101, 12) + A;
	C = rotintlft(C + F(D, A, B) + d[14 + 16 * blk] +
		      -1502002290, 17) + D;
	B = rotintlft(B + F(C, D, A) + d[15 + 16 * blk] +
		      1236535329, 22) + C;
}

function round2(blk) {

	A = rotintlft(A + G(B, C, D) + d[1 + 16 * blk] +
		      -165796510, 5) + B;
	D = rotintlft(D + G(A, B, C) + d[6 + 16 * blk] +
		      -1069501632, 9) + A;
	C = rotintlft(C + G(D, A, B) + d[11 + 16 * blk] +
		      643717713, 14) + D;
	B = rotintlft(B + G(C, D, A) + d[0 + 16 * blk] +
		      -373897302, 20) + C;
	A = rotintlft(A + G(B, C, D) + d[5 + 16 * blk] +
		      -701558691, 5) + B;
	D = rotintlft(D + G(A, B, C) + d[10 + 16 * blk] +
		      38016083, 9) + A;
	C = rotintlft(C + G(D, A, B) + d[15 + 16 * blk] +
		      -660478335, 14) + D;
	B = rotintlft(B + G(C, D, A) + d[4 + 16 * blk] +
		      -405537848, 20) + C;
	A = rotintlft(A + G(B, C, D) + d[9 + 16 * blk] +
		      568446438, 5) + B;
	D = rotintlft(D + G(A, B, C) + d[14 + 16 * blk] +
		      -1019803690, 9) + A;
	C = rotintlft(C + G(D, A, B) + d[3 + 16 * blk] +
		      -187363961, 14) + D;
	B = rotintlft(B + G(C, D, A) + d[8 + 16 * blk] +
		      1163531501, 20) + C;
	A = rotintlft(A + G(B, C, D) + d[13 + 16 * blk] +
		      -1444681467, 5) + B;
	D = rotintlft(D + G(A, B, C) + d[2 + 16 * blk] +
		      -51403784, 9) + A;
	C = rotintlft(C + G(D, A, B) + d[7 + 16 * blk] +
		      1735328473, 14) + D;
	B = rotintlft(B + G(C, D, A) + d[12 + 16 * blk] +
		      -1926607734, 20) + C;
}

function round3(blk) {

	A = rotintlft(A + H(B, C, D) + d[5 + 16 * blk] +
		      -378558, 4) + B;
	D = rotintlft(D + H(A, B, C) + d[8 + 16 * blk] +
		      -2022574463, 11) + A;
	C = rotintlft(C + H(D, A, B) + d[11 + 16 * blk] +
		      1839030562, 16) + D;
	B = rotintlft(B + H(C, D, A) + d[14 + 16 * blk] +
		      -35309556, 23) + C;
	A = rotintlft(A + H(B, C, D) + d[1 + 16 * blk] +
		      -1530992060, 4) + B;
	D = rotintlft(D + H(A, B, C) + d[4 + 16 * blk] +
		      1272893353, 11) + A;
	C = rotintlft(C + H(D, A, B) + d[7 + 16 * blk] +
		      -155497632, 16) + D;
	B = rotintlft(B + H(C, D, A) + d[10 + 16 * blk] +
		      -1094730640, 23) + C;
	A = rotintlft(A + H(B, C, D) + d[13 + 16 * blk] +
		      681279174, 4) + B;
	D = rotintlft(D + H(A, B, C) + d[0 + 16 * blk] +
		      -358537222, 11) + A;
	C = rotintlft(C + H(D, A, B) + d[3 + 16 * blk] +
		      -722521979, 16) + D;
	B = rotintlft(B + H(C, D, A) + d[6 + 16 * blk] +
		      76029189, 23) + C;
	A = rotintlft(A + H(B, C, D) + d[9 + 16 * blk] +
		      -640364487, 4) + B;
	D = rotintlft(D + H(A, B, C) + d[12 + 16 * blk] +
		      -421815835, 11) + A;
	C = rotintlft(C + H(D, A, B) + d[15 + 16 * blk] +
		      530742520, 16) + D;
	B = rotintlft(B + H(C, D, A) + d[2 + 16 * blk] +
		      -995338651, 23) + C;
}

function round4(blk) {

	A = rotintlft(A + I(B, C, D) + d[0 + 16 * blk] +
		      -198630844, 6) + B;
	D = rotintlft(D + I(A, B, C) + d[7 + 16 * blk] +
		      1126891415, 10) + A;
	C = rotintlft(C + I(D, A, B) + d[14 + 16 * blk] +
		      -1416354905, 15) + D;
	B = rotintlft(B + I(C, D, A) + d[5 + 16 * blk] +
		      -57434055, 21) + C;
	A = rotintlft(A + I(B, C, D) + d[12 + 16 * blk] +
		      1700485571, 6) + B;
	D = rotintlft(D + I(A, B, C) + d[3 + 16 * blk] +
		      -1894986606, 10) + A;
	C = rotintlft(C + I(D, A, B) + d[10 + 16 * blk] +
		      -1051523, 15) + D;
	B = rotintlft(B + I(C, D, A) + d[1 + 16 * blk] +
		      -2054922799, 21) + C;
	A = rotintlft(A + I(B, C, D) + d[8 + 16 * blk] +
		      1873313359, 6) + B;
	D = rotintlft(D + I(A, B, C) + d[15 + 16 * blk] +
		      -30611744, 10) + A;
	C = rotintlft(C + I(D, A, B) + d[6 + 16 * blk] +
		      -1560198380, 15) + D;
	B = rotintlft(B + I(C, D, A) + d[13 + 16 * blk] +
		      1309151649, 21) + C;
	A = rotintlft(A + I(B, C, D) + d[4 + 16 * blk] +
		      -145523070, 6) + B;
	D = rotintlft(D + I(A, B, C) + d[11 + 16 * blk] +
		      -1120210379, 10) + A;
	C = rotintlft(C + I(D, A, B) + d[2 + 16 * blk] +
		      718787259, 15) + D;
	B = rotintlft(B + I(C, D, A) + d[9 + 16 * blk] +
		      -343485551, 21) + C;
}

function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}
