let piecesData = {
	blackRook: { colorPiece: 'black', srcImg: './public/black_rook.png', initialPosition: ['a8', 'h8'] },
	whiteRook: { colorPiece: 'white', srcImg: './public/white_rook.png', initialPosition: ['a1', 'h1'] },

	blackKnight: { colorPiece: 'black', srcImg: './public/black_knight.png', initialPosition: ['b8', 'g8'] },
	whiteKnight: { colorPiece: 'white', srcImg: './public/white_knight.png', initialPosition: ['b1', 'g1'] },

	blackBishop: { colorPiece: 'black', srcImg: './public/black_bishop.png', initialPosition: ['c8', 'f8'] },
	whiteBishop: { colorPiece: 'white', srcImg: './public/white_bishop.png', initialPosition: ['c1', 'f1'] },

	blackPawn: { colorPiece: 'black', srcImg: './public/black_pawn.png', initialPosition: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'] },
	whitePawn: { colorPiece: 'white', srcImg: './public/white_pawn.png', initialPosition: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'] },

	blackKing: { colorPiece: 'black', srcImg: './public/black_king.png', initialPosition: ['e8'] },
	whiteKing: { colorPiece: 'white', srcImg: './public/white_king.png', initialPosition: ['e1'] },

	blackQueen: { colorPiece: 'black', srcImg: './public/black_queen.png', initialPosition: ['d8'] },
	whiteQueen: { colorPiece: 'white', srcImg: './public/white_queen.png', initialPosition: ['d1'] }
}

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

			let squareData = {
				[coordinate]: {
					number: boardNumber,
					color: color,
					name: coordinate,
					piece: null,
					colorPiece: null,
					pieceImg: null
				}
			}

			boardNumber++;
			letterFromAscii++;
			Object.assign(board, squareData);
		}
		letterFromAscii = 97;
		squareColor.reverse();
	}
	console.log('create board obj', board);
};

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

let createHtmlSquares = () => {
	let boardHtml = document.getElementById('board');

	for (let coodinate in board) {
		let coordinateObject = board[coodinate];

		// create element
		let square = document.createElement('div');
		let img = document.createElement('img');

		// attributes
		square.setAttribute('id', coordinateObject.name);
		square.setAttribute('class', 'square');

		square.style.width = '50px';
		square.style.height = '50px';
		square.style.background = coordinateObject.color;
		square.textContent = coodinate;

		img.setAttribute('id', 'img-' + coodinate);

		square.addEventListener('click', e => {
			let coordinateSelected = e.target.id.slice(-2);
			console.log('coordinate selected: ', coordinateSelected, e.target.id);
			movementArr.push(coordinateSelected);
			movePiece();
		});

		// append
		boardHtml.appendChild(square);
		square.appendChild(img)
	}
};

let initialPieces = () => {
	for (const piece in piecesData) {
		let pieceObj = piecesData[piece];
		let position = pieceObj.initialPosition; // arr
		for (const i in position) {
			console.log('initial position: ', position[i], piece)
			board[position[i]].piece = piece;
		}
	}
	console.log(board);
};

let renderPieces = () => {
	for (let i in board) {
		let imgElement = document.getElementById('img-' + i);
		let piece = board[i].piece;

		if (piece) {
			let pieceImg = piecesData[piece].srcImg;
			imgElement.setAttribute('src', pieceImg);
		}
	}
};

let movementArr = [];
let auxColor = '';
let movePiece = () => {

	let firstCoordinate = movementArr[0];
	let firstElement = document.getElementById(firstCoordinate);

	let auxPiece = '';

	if (movementArr.length == 1) {
		if (!board[firstCoordinate].piece) {
			movementArr = [];
			console.log('you cannot select empty space');
		} else {
			auxColor = board[firstCoordinate].color;
			firstElement.style.background = 'red';
			console.log(firstCoordinate, firstElement, auxColor);
		}
	} else if (movementArr.length == 2) {
		let secondCoordinate = movementArr[1];
		let secondElement = document.getElementById(secondCoordinate);
		let firstImg = document.getElementById('img-'+firstCoordinate);

		if (firstCoordinate != secondCoordinate) {
			auxPiece = board[firstCoordinate].piece;
			board[secondCoordinate].piece = auxPiece;
			board[firstCoordinate].piece = null;
			firstElement.style.background = auxColor;
			console.log('color check',firstElement, 'color:', auxColor)
			firstImg.removeAttribute('src');
			auxColor = '';
		}
		auxPiece = '';
		movementArr = [];
		renderPieces();
		console.log('last board', board);
	}
	/*
	

		
			} else if (movementArr.length == 2) {
		
				let second = board[movementArr[1]];
		
				if (first != second && first.colorPiece != second.colorPiece) {
					let secondElement = document.getElementById(second.name);
		
					console.log('first: ', first, '\nsecond: ', second);
					aux = first.piece;
					let auxColorPiece = first.colorPiece;
		
					second.piece = first.piece;
					second.colorPiece = auxColorPiece;
		
					first.piece = null;
					first.colorPiece = null;
					aux = '';
					movementArr = [];
		
					renderPiece(firstElement, first, first.name);
					renderPiece(secondElement, second, second.name);
		
					console.log(board);
				}
		
				firstElement.style.background = firstElementColor;
				movementArr = [];
			}*/
};

createBoardObj();
createHtmlBoard();
createHtmlSquares();
initialPieces();
renderPieces();
/*

let img = document.createElement('img');
img.setAttribute('src', './public/black_pawn.png');
img.style.width = '40px';
img.style.height = '40px';
document.body.appendChild(img);
*/