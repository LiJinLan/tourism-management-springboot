var NOEBC='^';
var INVEBC=0x01;
var NOASC=0x40;

var e2aTbl = [
0x00, 0x01, 0x02, 0x03, INVEBC, 0x09, INVEBC, 0x7F, INVEBC, INVEBC, INVEBC, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F,
0x10, 0x11, 0x12, INVEBC, INVEBC, 0x0A, 0x08, INVEBC, 0x18, 0x19, INVEBC, INVEBC, 0x1C, 0x1D, 0x1E, 0x1F,
INVEBC, INVEBC, 0x1C, INVEBC, INVEBC, 0x0A, 0x17, 0x1B, INVEBC, INVEBC, INVEBC, INVEBC, INVEBC, 0x05, 0x06, 0x07,
INVEBC, INVEBC, 0x16, INVEBC, INVEBC, 0x1E, INVEBC, 0x04, INVEBC, INVEBC, INVEBC, INVEBC, INVEBC, 0x15, INVEBC, 0x1A,
' ',	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	0x5B, '.',    '<',    '(',    '+',    0X21,
'&',	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	'!',	'$',	'*',	')',	';',	0x5E,
'-',	'/',	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	'|',	',',	'%',	'_',	'>',	'?',
NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	0x60, ':',    '#',    '@',    0x27, '=',    0x22,
NOEBC,	'a',	'b',	'c',	'd',	'e',	'f',	'g',	'h',	'i',	NOEBC,	 NOEBC, NOEBC,	NOEBC,	NOEBC,	NOEBC,
NOEBC,	'j',	'k',	'l',	'm',	'n',	'o',	'p',	'q',	'r',	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,
NOEBC,	0x7E, 's',    't',    'u',    'v',    'w',    'x',    'y',    'z',    NOEBC,  NOEBC,  NOEBC,  NOEBC,  NOEBC,  NOEBC,
NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,	NOEBC,
0x7B, 'A',    'B',    'C',    'D',    'E',    'F',    'G',    'H',    'I',    NOEBC,  NOEBC,  NOEBC,  NOEBC,  NOEBC,  NOEBC,
0x7D, 'J',    'K',    'L',    'M',    'N',    'O',    'P',    'Q',    'R',    NOEBC,  NOEBC,  NOEBC,   NOEBC,  NOEBC,  NOEBC,
0x5C, NOEBC,  'S',    'T',    'U',    'V',    'W',    'X',    'Y',    'Z',    NOEBC,   NOEBC,  NOEBC,  NOEBC,  NOEBC,  NOEBC,
'0',	'1',	'2',	'3',	'4',	'5',	'6',	'7',	'8',	'9',	NOEBC,	NOEBC,	NOEBC,	 NOEBC,  NOEBC,  NOEBC
];

var a2eTbl = [
0x00, 0x01, 0x02, 0x03, 0x37, 0x2D, 0x2E, 0x2F, 0x16, 0x05, 0x15, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F,
0x10, 0x11, 0x12, 0x3B, 0xB6,	0x3d,	0x32, 0x26, 0x18, 0x19, 0x3F, 0x27, 0x1C, 0x1D, 0x1E, 0x1F,
0x40, 0x4F, 0x7F, 0x7B, 0x5B, 0x6C, 0x50, 0x7D, 0x4D, 0x5D, 0x5C, 0x4E, 0x6B, 0x60, 0x4B, 0x61,
0xF0,	0xF1,	0xF2,	0xF3,	0xF4,	0xF5,	0xF6,	0xF7,	 0xF8,	 0xF9,	0x7A, 0x5E, 0x4C, 0x7E, 0x6E, 0x6F,
0x7C, 0xC1,   0xC2,   0xC3,   0xC4,   0xC5,   0xC6,   0xC7,    0xC8,   0xC9,   0xD1,   0xD2,   0xD3,   0xD4,   0xD5,   0xD6,
0xD7,	0xD8,	0xD9,	0xE2,	0xE3,	0xE4,	0xE5,	0xE6,	 0xE7,	 0xE8,	 0xE9,	0x4A,  0xE0,  0x5A, 0x5F, 0x6D,
0x79, 0x81,   0x82,   0x83,   0x84,   0x85,   0x86,   0x87,    0x88,   0x89,   0x91,   0x92,   0x93,   0x94,   0x95,   0x96,
0x97,	0x98,	0x99,	0xA2,	0xA3,	0xA4,	0xA5,	0xA6,	 0xA7,	 0xA8,	 0xA9,	 0xC0,	 0x6A, 0xD0,   0xA1,   0x07,
NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	 NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,
NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	 NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,
NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	 NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,
NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	 NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,
NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	 NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,
NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	 NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,
NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	 NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,
NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	NOASC,	 NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC,  NOASC
];

function a2eChar(a)
{
	return a2eTbl[a];
}

function a2e(trn)
{

  var tmp = "";
  var i;

  for(i=0; i < trn.length;i++) {
	 tmp = tmp + a2eChar(trn.charAt(i));
  }

  return tmp;
}

function e2aChar(a)
{
	return e2aTbl[a];
}

function e2a(trn)
{

  var tmp="";
  var i;

  for(i=0; i < trn.length;i++)
	 tmp = tmp + e2aChar(trn.charAt(i));

  return tmp;
}
