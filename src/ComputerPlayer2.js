import React from 'react';
var difficultyLevel;
class ComputerPlayer2 extends React.Component {
    
  getMoveEasy(squares) {
    const emptySquares = squares.reduce((acc, value, index) => {
      if (value === null) {
        acc.push(index);
      }
      return acc;
    }, []);
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
  }

  getMoveMedium(squares) {
    const rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    const columns = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
    const diagonals = [[0, 4, 8], [2, 4, 6]];
    const possibleWins = rows.concat(columns, diagonals);
    
    for (let i = 0; i < possibleWins.length; i++) {
      const [a, b, c] = possibleWins[i];
      if (squares[a] === 'O' && squares[a] === squares[b] && squares[c] === null) {
        return c;
      } else if (squares[b] === 'O' && squares[b] === squares[c] && squares[a] === null) {
        return a;
      } else if (squares[c] === 'O' && squares[c] === squares[a] && squares[b] === null) {
        return b;
      } else if (squares[a] === 'X' && squares[a] === squares[b] && squares[c] === null) {
        return c;
      } else if (squares[b] === 'X' && squares[b] === squares[c] && squares[a] === null) {
        return a;
      } else if (squares[c] === 'X' && squares[c] === squares[a] && squares[b] === null) {
        return b;
      }
    }

    const emptySquares = squares.reduce((acc, value, index) => {
      if (value === null) {
        acc.push(index);
      }
      return acc;
    }, []);
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
  }

  getMoveHard(squares) {
    // Define the recursive minimax function using an arrow function to maintain the correct value of `this`
    const minimax = (depth, alpha, beta, isMaximizingPlayer) => {
      // Base case: return the score if the game is over or the maximum depth has been reached
      if (this.calculateWinner(squares) || depth === 0) {
        return this.evaluate(squares);
      }
  
      // Recursive case: find the best score for the current player by exploring all possible moves
      if (isMaximizingPlayer) {
        let maxScore = -Infinity;
        for (let i = 0; i < squares.length; i++) {
          if (squares[i]) continue;
          squares[i] = this.getCurrentPlayer();
          let score = minimax(depth - 1, alpha, beta, false);
          squares[i] = null;
          maxScore = Math.max(maxScore, score);
          alpha = Math.max(alpha, score);
          if (beta <= alpha) break;
        }
        return maxScore;
      } else {
        let minScore = Infinity;
        for (let i = 0; i < squares.length; i++) {
          if (squares[i]) continue;
          squares[i] = this.getOtherPlayer();
          let score = minimax(depth - 1, alpha, beta, true);
          squares[i] = null;
          minScore = Math.min(minScore, score);
          beta = Math.min(beta, score);
          if (beta <= alpha) break;
        }
        return minScore;
      }
    }
  
    let bestScore = -Infinity;
    let bestMove;
  
    // Find the best move by evaluating all possible moves
    for (let i = 0; i < squares.length; i++) {
      if (squares[i]) continue;
      squares[i] = this.getCurrentPlayer();
      let score = minimax(3, -Infinity, Infinity, false);
      squares[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  
    return bestMove;
  }
  
  getMove(squares, player) {
    console.log(difficultyLevel);

    let move;
    if (difficultyLevel === 'medium') {
      move = this.getMoveMedium(squares);
    } else if (difficultyLevel === 'hard') {
      move = this.getMoveHard(squares);
    } else {
      move = this.getMoveEasy(squares);
    }
    return move;
  }

  render() {
    difficultyLevel=this.props.difficultyLevel;
    console.log(difficultyLevel);

    return ;
  }
}

export default ComputerPlayer2;
