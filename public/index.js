

let piecesCode = {
	blackRook: { code: '265c', colorPiece: 'black' },
	whiteRook: { code: '2656', colorPiece: 'white' },
	blackKnight: { code: '265e', colorPiece: 'black' },
	whiteKnight: { code: '2658', colorPiece: 'white' },
	blackBishop: { code: '265d', colorPiece: 'black' },
	whiteBishop: { code: '2657', colorPiece: 'white' },
	blackPawn: { code: '265f', colorPiece: 'black' },
	whitePawn: { code: '2659', colorPiece: 'white' },
	blackKing: { code: '265a', colorPiece: 'black' },
	whiteKing: { code: '2654', colorPiece: 'white' },
	blackQueen: { code: '265b', colorPiece: 'black' },
	whiteQueen: { code: '2655', colorPiece: 'white' }
}

let initialPos = {
	// rook
	'a1': piecesCode.whiteRook,
	'h1': piecesCode.whiteRook,
	'a8': piecesCode.blackRook,
	'h8': piecesCode.blackRook,

	//knight
	'b1': piecesCode.whiteKnight,
	'g1': piecesCode.whiteKnight,
	'b8': piecesCode.blackKnight,
	'g8': piecesCode.blackKnight,

	// bishop
	'c1': piecesCode.whiteBishop,
	'f1': piecesCode.whiteBishop,
	'c8': piecesCode.blackBishop,
	'f8': piecesCode.blackBishop,

	// king
	'e1': piecesCode.whiteKing,
	'e8': piecesCode.blackKing,

	// queen
	'd1': piecesCode.whiteQueen,
	'd8': piecesCode.blackQueen,

	//pawn
	'a2': piecesCode.whitePawn,
	'b2': piecesCode.whitePawn,
	'c2': piecesCode.whitePawn,
	'd2': piecesCode.whitePawn,
	'e2': piecesCode.whitePawn,
	'f2': piecesCode.whitePawn,
	'g2': piecesCode.whitePawn,
	'h2': piecesCode.whitePawn,

	'a7': piecesCode.blackPawn,
	'b7': piecesCode.blackPawn,
	'c7': piecesCode.blackPawn,
	'd7': piecesCode.blackPawn,
	'e7': piecesCode.blackPawn,
	'f7': piecesCode.blackPawn,
	'g7': piecesCode.blackPawn,
	'h7': piecesCode.blackPawn
};

let board = {};
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
			let pieceData = initialPos[coordinate];
			console.log('hey ', pieceData, ' ', coordinate)

			let pieceCode = !pieceData ? null : pieceData.code;
			let squareData = {
				[coordinate]: {
					number: boardNumber,
					color: color,
					piece: pieceCode,
					name: coordinate
				}
			}

			boardNumber++;
			letterFromAscii++;
			Object.assign(board, squareData);

			// console.log('coordinate: ', coordinate, 'board number: ', boardNumber % 2);
		}
		letterFromAscii = 97;
		squareColor.reverse();
	}
	//console.log(board);
};



// render
let createIcon = pieceCode => String.fromCodePoint(parseInt(pieceCode, 16));

let createHtmlBoard = () => {
	// create
	let boardHtml = document.createElement('div');

	// attributes
	boardHtml.setAttribute('id', 'board');

	boardHtml.style.width = '400px';
	boardHtml.style.height = '400px';

	// append
	document.body.appendChild(boardHtml);
};

let arr = [];

let createHtmlSquares = () => {

	let boardHtml = document.getElementById('board');

	for (let coordinateName in board) {

		let coordinateObj = board[coordinateName];

		// create element
		let square = document.createElement('div');

		// attributes
		square.setAttribute('id', coordinateObj.name);
		square.setAttribute('class', 'square');

		square.style.width = '50px';
		square.style.height = '50px';
		square.style.background = coordinateObj.color;

		square.addEventListener('click', e => {
			arr.push(e.target.id);
			movePiece();
		});

		renderPiece(square, coordinateObj, coordinateName);

		// append
		boardHtml.appendChild(square);
	}
};

let renderPiece = (htmlElement, coordinateObj, coordinateName) => {
	htmlElement.textContent = typeof coordinateObj.piece == 'string'
		? coordinateName + createIcon(coordinateObj.piece)
		: coordinateName;
};

let movePiece = () => {

	let first = board[arr[0]];

	let aux = '';

	let firstElement = document.getElementById(first.name);
	let firstElementColor = first.color;

	if (arr.length == 1) {

		if (first.piece == null) {
			arr = [];
			console.log('you cannot select empty space');
		} else {
			firstElement.style.background = 'grey';
			console.log('first: ', first);
		}


	} else if (arr.length == 2) {

		let second = board[arr[1]];

		if (first != second) {
			let secondElement = document.getElementById(second.name);


			console.log('first: ', first, '\nsecond: ', second);
			aux = first.piece;

			second.piece = first.piece;
			first.piece = null;
			aux = '';
			arr = [];

			renderPiece(firstElement, first, first.name);
			renderPiece(secondElement, second, second.name);

			console.log(board);
		}

		firstElement.style.background = firstElementColor;
		console.log('the are equals');
		arr = [];



	}
};

createBoardObj();
createHtmlBoard();
createHtmlSquares();

