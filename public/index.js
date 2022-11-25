let board = document.createElement('div');
board.setAttribute('id', 'board');
board.setAttribute('class', 'squares');
board.style.backgroundColor = 'green';
board.style.width = '400px';
board.style.height= '400px';


let createSquares = () => {
  let count = 0;
  let colors = ['white', 'black'];

 for(let i = 0; i < 64  ;i++) {
   let squares = document.createElement('div');
   squares.setAttribute('class', 'squares');
   squares.style.width = '50px';
   squares.style.height = '50px';
   if(count == 8) {
   
     colors.reverse();
     count = 0;
    
   }
     
   squares.style.backgroundColor = i % 2==0 ? colors[0]: colors[1];
   
   board.appendChild(squares);
   count++;
 }
 
};




document.body.appendChild(board);
createSquares();
