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

let initialPos = {
	// rook
	'a1': piecesData.whiteRook,
	'h1': piecesData.whiteRook,
	'a8': piecesData.blackRook,
	'h8': piecesData.blackRook,

	//knight
	'b1': piecesData.whiteKnight,
	'g1': piecesData.whiteKnight,
	'b8': piecesData.blackKnight,
	'g8': piecesData.blackKnight,

	// bishop
	'c1': piecesData.whiteBishop,
	'f1': piecesData.whiteBishop,
	'c8': piecesData.blackBishop,
	'f8': piecesData.blackBishop,

	// king
	'e1': piecesData.whiteKing,
	'e8': piecesData.blackKing,

	// queen
	'd1': piecesData.whiteQueen,
	'd8': piecesData.blackQueen,

	//pawn
	'a2': piecesData.whitePawn,
	'b2': piecesData.whitePawn,
	'c2': piecesData.whitePawn,
	'd2': piecesData.whitePawn,
	'e2': piecesData.whitePawn,
	'f2': piecesData.whitePawn,
	'g2': piecesData.whitePawn,
	'h2': piecesData.whitePawn,

	'a7': piecesData.blackPawn,
	'b7': piecesData.blackPawn,
	'c7': piecesData.blackPawn,
	'd7': piecesData.blackPawn,
	'e7': piecesData.blackPawn,
	'f7': piecesData.blackPawn,
	'g7': piecesData.blackPawn,
	'h7': piecesData.blackPawn
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



			//let pieceData = initialPos[coordinate];
			//let srcImg = pieceData ? pieceData.srcImg : '';



			//			let pieceCode = !pieceData ? null : pieceData.code;
			//	let colorPiece = !pieceData ? null : pieceData.colorPiece;

			let squareData = {
				[coordinate]: {
					number: boardNumber,
					color: color,
					//piece: pieceCode,
					//colorPiece: colorPiece,
					name: coordinate,
					piece: '',
					colorPiece: '',
					pieceImg: ''
					//	img: srcImg
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


let createHtmlSquares = () => {

	let boardHtml = document.getElementById('board');

	for (let coordinateName in board) {

		let coordinateObject = board[coordinateName];
		//console.log(coordinateObject);
		// create element
		let square = document.createElement('div');
		let img = document.createElement('img')
		// attributes
		square.setAttribute('id', coordinateObject.name);
		square.setAttribute('class', 'square');

		img.setAttribute('id', 'img-' + coordinateName);

		square.style.width = '50px';
		square.style.height = '50px';
		square.style.background = coordinateObject.color;
		square.textContent = coordinateName;
		//img.setAttribute('src', coordinateObject.srcImg)

		square.addEventListener('click', e => {
			let coordinateSelected = e.path[1].id;
			movementArr.push(coordinateSelected);
			movePiece();
			//movementArr.push(e.target.id);
			//movePiece();
		});

		//		renderPiece(square, coordinateObject, coordinateName);

		// append
		boardHtml.appendChild(square);
		square.appendChild(img)
		/*
		let imgPieceSrc ='';
		let imgPiece = document.createElement('img');
		img.setAttribute('src', imgPieceSrc);
		img.style.width = '40px';
		img.style.height = '40px';
		square.appendChild(imgPiece);
		
		*/
	}
};

/*
let renderPiece = (htmlElement, coordinateObject, coordinateName) => {
	htmlElement.textContent = typeof coordinateObject.piece == 'string'
		? coordinateName + createIcon(coordinateObject.piece)
		: coordinateName;
};
*/
let initialPieces = () => {
	console.log(board);
	for (const piece in piecesData) {
		let pieceData = piecesData[piece];
		let position = pieceData.initialPosition; // movementArr
		for (const i in position) {
			console.log(position[i], piece)
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
			console.log(board[i], piece, pieceImg)
		}

	}
};


let movementArr = [];
let movePiece = () => {



	let first = board[movementArr[0]];
	console.log('piece selected: ', first);

	let firstElement = document.getElementById(first.name);
	let aux = '';

	if (movementArr.length == 1) {

	} else if (movementArr.length == 2) {

	}


	/*
	
		let firstElementColor = first.color;
	
		if (movementArr.length == 1) {
	
			if (first.piece == null) {
				movementArr = [];
				console.log('you cannot select empty space');
			} else {
				firstElement.style.background = 'grey';
				console.log('first: ', first);
			}
	
	
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