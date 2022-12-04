let board = {};

let piecesCode = {
	br: '265c',
	wr: '2656',
	bkg: '265e',
	wkg: '2658',
	bb: '265d',
	wb: '2657',
	bp: '265f',
	wp: '2659',
	bk: '265a',
	wk: '2654',
	bq: '265b',
	wq: '2655'
}

let initialPos = {
	// rook
	'a1': piecesCode.wr,
	'h1': piecesCode.wr,
	'a8': piecesCode.br,
	'h8': piecesCode.br,

	//knight
	'b1': piecesCode.wkg,
	'g1': piecesCode.wkg,
	'b8': piecesCode.bkg,
	'g8': piecesCode.bkg,

	// bishop
	'c1': piecesCode.wb,
	'f1': piecesCode.wb,
	'c8': piecesCode.bb,
	'f8': piecesCode.bb,

	// king
	'e1': piecesCode.wk,
	'e8': piecesCode.bk,

	// queen
	'd1': piecesCode.wq,
	'd8': piecesCode.bq,

	//pawn
	'a2': piecesCode.wp,
	'b2': piecesCode.wp,
	'c2': piecesCode.wp,
	'd2': piecesCode.wp,
	'e2': piecesCode.wp,
	'f2': piecesCode.wp,
	'g2': piecesCode.wp,
	'h2': piecesCode.wp,

	'a7': piecesCode.bp,
	'b7': piecesCode.bp,
	'c7': piecesCode.bp,
	'd7': piecesCode.bp,
	'e7': piecesCode.bp,
	'f7': piecesCode.bp,
	'g7': piecesCode.bp,
	'h7': piecesCode.bp,
};

// ascii for letter 'a' is 97
let letterFromAscii = 97;
let boardNumber = 1;
// black color - white color
let squareColor = ['green', 'lightyellow'];

let createBoardObj = () => {
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			// first return 'a1'
			let coordinate = String.fromCharCode(letterFromAscii) + (i + 1);
			let color = boardNumber % 2 ? squareColor[0] : squareColor[1];

			let pieceCode = typeof initialPos[coordinate] == 'string' ? initialPos[coordinate] : null;
			let squareData = {
				[coordinate]: {
					number: boardNumber,
					color: color,
					piece: pieceCode

				}
			}

			boardNumber++;
			letterFromAscii++;
			Object.assign(board, squareData);

			console.log('coordinate: ', coordinate, 'board number: ', boardNumber % 2);
		}
		letterFromAscii = 97;
		squareColor.reverse();
	}

};

createBoardObj();

// render

let createIcon = code => String.fromCodePoint(parseInt(code, 16));
let boardHtml = document.createElement('div');
boardHtml.setAttribute('id', 'board');
document.body.appendChild(boardHtml);

for (let i = 1; i < 65; i++) {
	let square = document.createElement('div');
	square.setAttribute('class', 'square');
	square.setAttribute('id', i);
	boardHtml.appendChild(square);
}

for (let i in board) {
	let coord = board[i];
	let id = coord.number;
	let element = document.getElementById(id);
	element.style.background = coord.color;
	element.textContent = typeof coord.piece == 'string' ? i + createIcon(coord.piece) : i;
	console.log('test', coord);
	element.style.width = '50px';
	element.style.height = '50px';
}



document.getElementById("1").addEventListener("click", function () {
	document.getElementById("1").innerHTML = "Hello World!";
}, false);


console.log(board);



