import React from 'react';
import calculateWinner from './calculateWinner';
import Square from './Square';
import isBoardFull from './isBoardFull';
import ComputerPlayer from './ComputerPlayer2';

class Game2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      isComputerTurn: false,
      gameMode: 'joueur-vs-joueur',
      difficultyLevel: 'moyen',
    };
    this.computerPlayer = new ComputerPlayer(this.state.difficultyLevel);
    this.handleDifficultyLevelChange = this.handleDifficultyLevelChange.bind(this);

  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    if (!isBoardFull(squares) && this.state.gameMode === "joueur-vs-joueur") {
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }
    if (!isBoardFull(squares) && this.state.gameMode === "joueur-vs-ordinateur") {
      squares[i] = "X";
      this.setState({
        squares: squares,
      });
      setTimeout(() => {
        const computerMove = this.computerPlayer.getMove(squares, 'O');
        squares[computerMove] = 'O';
        this.setState({
          squares: squares,
          xIsNext: true,
        });
      }, 500);
    }
  }

  handleNewGameClick() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      isComputerTurn: false,
    });
  }

  componentDidUpdate() {
    if (this.state.gameMode === "joueur-vs-ordinateur" && !this.state.xIsNext && this.state.isComputerTurn) {
      const squares = this.state.squares.slice();
      const computerMove = this.computerPlayer.getMove(squares, 'O');
      squares[computerMove] = 'O';
      this.setState({
        squares: squares,
        xIsNext: true,
        isComputerTurn: false,
      });
    }
  }

  handleGameModeClick() {
    this.handleNewGameClick();
    this.setState({
      gameMode: this.state.gameMode === "joueur-vs-joueur" ? "joueur-vs-ordinateur" : "joueur-vs-joueur",
    });
  }
  handleDifficultyLevelChange = (event) => {
    const value = event.target.value;
  
    if (value) {
      const computerPlayer = new ComputerPlayer(value);
      this.setState({
        difficultyLevel: value,
        computerPlayer: computerPlayer, 
      });
    }
  }
  
  


  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        key={i}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let gameStatus;
    if (winner) {
      gameStatus = "Winner: " + winner;
    } else if (isBoardFull(this.state.squares)) {
      gameStatus = "Egualite";
    } else if (this.state.gameMode === "joueur-vs-ordinateur" && !this.state.xIsNext) {
      gameStatus = "ordinateur jouer...";
    } else {
      gameStatus = "Joueur Suivant: " + (this.state.xIsNext ? "X" : "O");
    }
  
    return (
      <div style={{
        marginTop:"50px",
        textAlign:"center",
        
        }}>
        <div  style={{
            fontFamily:'sans-serif',
            fontSize:'50px',
            color:'white'
            
          
        }} > <h1> TIC TAC TOE </h1></div><div className="game-status">{gameStatus}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <br/>
        <button style={{
          color:'green',
          fontSize:'20px'
        }} onClick={() => this.handleNewGameClick()}>Nouveau jeu</button>
        <br/> 
        <br/> 
        <button style={{
          color:'blue',
          fontSize:'20px'

        }} onClick={() => this.handleGameModeClick()}>
         changer a {this.state.gameMode === "joueur-vs-joueur" ? "joueur-vs-ordinateur" : "joueur-vs-joueur"}
        </button>
        <br/>
        {this.state.gameMode === "joueur-vs-ordinateur" && this.state.xIsNext && (
          <div>
            <label htmlFor="difficulty-select">Difficulty:</label>
            <select id="difficulty-select" value={this.state.difficultyLevel} onChange={this.handleDifficultyLevelChange}>
              <option value="facile">Facile</option>
              <option value="moyen">Moyen</option>
              <option value="difficile">Difficile</option>
            </select>
          </div>
        )}
        {this.state.gameMode === "joueur-vs-ordinateur" && !this.state.xIsNext && (
          <ComputerPlayer difficultyLevel="difficlie"  />
        )}
                  <ComputerPlayer difficultyLevel="facile"  />

      </div>
    );
  }
  
}

export default Game2;
