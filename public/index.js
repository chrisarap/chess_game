let board = {};
let letterFromAscii = 97;
let boardNumber = 1;
let squareColor = ['black' , 'white'];
let pawns = 2;
let initialPos = {
	'a1' : 'r',
	'h1' : 'r'
};

/*rkbqkbkr
 *pppppppp
 *
 *
 *
 *
 *ppppppp
 *rkbqkbkr
 *white
*/

for(let i = 0; i < 8; i++){
	for(let j = 0; j < 8; j++){
		let coordinate = String.fromCharCode(letterFromAscii) + (i + 1);
		let color = boardNumber % 2 ? squareColor[0] : squareColor[1];
		 let arr =  {
			[coordinate]: {
				number: boardNumber,
				color: color,
				piece: null
	
      			}
    		}

		boardNumber++;
		letterFromAscii++;
		Object.assign(board, arr);
  }
  letterFromAscii = 97;
  squareColor.reverse();
}

// render

let boardHtml = document.createElement('div');
boardHtml.setAttribute('id', 'board');
document.body.appendChild(boardHtml);

for(let i = 1; i < 65; i++) {
	let square = document.createElement('div');
	square.setAttribute('class', 'square');
	square.setAttribute('id', i);
	boardHtml.appendChild(square);
}

for(let i in board) {
	let coord = board[i];
        let id = coord.number;
	let element = document.getElementById(id);
	element.style.color = coord.color;
	element.textContent = i;

}

let test = document.createElement('div');
test.setAttribute('id', 'test');
test.textContent = String.fromCodePoint(parseInt('265c', 16));
document.body.appendChild(test);


console.log(board);
