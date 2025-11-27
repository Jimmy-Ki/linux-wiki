import React, { useState, useEffect, useCallback } from 'react';
import { IconRotate, IconArrowUp, IconArrowDown, IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import styles from './styles.module.css';

export default function Game2048() {
  const [grid, setGrid] = useState(() => initializeGrid());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('2048-best-score') || '0');
    }
    return 0;
  });
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  function initializeGrid() {
    const newGrid = Array(4).fill().map(() => Array(4).fill(0));
    addNewTile(newGrid);
    addNewTile(newGrid);
    return newGrid;
  }

  function addNewTile(currentGrid) {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentGrid[i][j] === 0) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      currentGrid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  function moveLeft(currentGrid) {
    let newGrid = currentGrid.map(row => [...row]);
    let scoreIncrease = 0;
    let moved = false;

    for (let i = 0; i < 4; i++) {
      let row = newGrid[i].filter(val => val !== 0);
      let merged = [];

      for (let j = 0; j < row.length - 1; j++) {
        if (row[j] === row[j + 1] && !merged.includes(j) && !merged.includes(j + 1)) {
          row[j] *= 2;
          scoreIncrease += row[j];
          row.splice(j + 1, 1);
          merged.push(j);
        }
      }

      while (row.length < 4) {
        row.push(0);
      }

      if (JSON.stringify(row) !== JSON.stringify(newGrid[i])) {
        moved = true;
      }

      newGrid[i] = row;
    }

    return { grid: newGrid, scoreIncrease, moved };
  }

  function rotateGrid(currentGrid, times) {
    let newGrid = currentGrid.map(row => [...row]);
    for (let t = 0; t < times; t++) {
      const rotated = Array(4).fill().map(() => Array(4).fill(0));
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          rotated[j][3 - i] = newGrid[i][j];
        }
      }
      newGrid = rotated;
    }
    return newGrid;
  }

  function move(direction) {
    if (gameOver || won) return;

    let newGrid = grid.map(row => [...row]);
    let scoreIncrease = 0;
    let moved = false;

    switch (direction) {
      case 'left':
        const resultLeft = moveLeft(newGrid);
        newGrid = resultLeft.grid;
        scoreIncrease = resultLeft.scoreIncrease;
        moved = resultLeft.moved;
        break;
      case 'right':
        newGrid = rotateGrid(newGrid, 2);
        const resultRight = moveLeft(newGrid);
        newGrid = rotateGrid(resultRight.grid, 2);
        scoreIncrease = resultRight.scoreIncrease;
        moved = resultRight.moved;
        break;
      case 'up':
        newGrid = rotateGrid(newGrid, 3);
        const resultUp = moveLeft(newGrid);
        newGrid = rotateGrid(resultUp.grid, 1);
        scoreIncrease = resultUp.scoreIncrease;
        moved = resultUp.moved;
        break;
      case 'down':
        newGrid = rotateGrid(newGrid, 1);
        const resultDown = moveLeft(newGrid);
        newGrid = rotateGrid(resultDown.grid, 3);
        scoreIncrease = resultDown.scoreIncrease;
        moved = resultDown.moved;
        break;
    }

    if (moved) {
      addNewTile(newGrid);
      setGrid(newGrid);
      const newScore = score + scoreIncrease;
      setScore(newScore);

      if (newScore > bestScore) {
        setBestScore(newScore);
        if (typeof window !== 'undefined') {
          localStorage.setItem('2048-best-score', newScore.toString());
        }
      }

      // Check for win
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (newGrid[i][j] === 2048) {
            setWon(true);
          }
        }
      }

      // Check for game over
      if (!hasAvailableMoves(newGrid)) {
        setGameOver(true);
      }
    }
  }

  function hasAvailableMoves(currentGrid) {
    // Check for empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentGrid[i][j] === 0) return true;
      }
    }

    // Check for possible merges
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const current = currentGrid[i][j];
        if (i < 3 && current === currentGrid[i + 1][j]) return true;
        if (j < 3 && current === currentGrid[i][j + 1]) return true;
      }
    }

    return false;
  }

  function newGame() {
    setGrid(initializeGrid());
    setScore(0);
    setGameOver(false);
    setWon(false);
  }

  const handleKeyPress = useCallback((e) => {
    if (gameOver && !won) return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        move('left');
        break;
      case 'ArrowRight':
        e.preventDefault();
        move('right');
        break;
      case 'ArrowUp':
        e.preventDefault();
        move('up');
        break;
      case 'ArrowDown':
        e.preventDefault();
        move('down');
        break;
    }
  }, [grid, score, gameOver, won]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  function getTileColor(value) {
    const colors = {
      0: '#cdc1b4',
      2: '#eee4da',
      4: '#ede0c8',
      8: '#f2b179',
      16: '#f59563',
      32: '#f67c5f',
      64: '#f65e3b',
      128: '#edcf72',
      256: '#edcc61',
      512: '#edc850',
      1024: '#edc53f',
      2048: '#edc22e',
    };
    return colors[value] || '#3c3a32';
  }

  function getTileTextColor(value) {
    return value <= 4 ? '#776e65' : '#f9f6f2';
  }

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>2048 Game</h1>
          <p>Join the tiles, get to 2048!</p>
        </div>

        <div className={styles.gameInfo}>
          <div className={styles.scoreContainer}>
            <div className={styles.scoreBox}>
              <div className={styles.scoreLabel}>Score</div>
              <div className={styles.scoreValue}>{score}</div>
            </div>
            <div className={styles.scoreBox}>
              <div className={styles.scoreLabel}>Best</div>
              <div className={styles.scoreValue}>{bestScore}</div>
            </div>
          </div>
          <button onClick={newGame} className={styles.newGameButton}>
            <IconRotate size={16} />
            New Game
          </button>
        </div>

        <div className={styles.gameContainer}>
          <div className={styles.grid}>
            {grid.map((row, i) => (
              row.map((value, j) => (
                <div
                  key={`${i}-${j}`}
                  className={styles.tile}
                  style={{
                    backgroundColor: getTileColor(value),
                    color: getTileTextColor(value)
                  }}
                >
                  {value !== 0 && value}
                </div>
              ))
            ))}
          </div>

          {(gameOver || won) && (
            <div className={styles.overlay}>
              <div className={styles.overlayContent}>
                {won ? (
                  <>
                    <h2>You Win!</h2>
                    <p>Congratulations! You've reached 2048!</p>
                  </>
                ) : (
                  <>
                    <h2>Game Over!</h2>
                    <p>No more moves available. Try again!</p>
                  </>
                )}
                <button onClick={newGame} className={styles.playAgainButton}>
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.controls}>
          <h3>How to Play</h3>
          <p>Use arrow keys to move tiles. When two tiles with the same number touch, they merge into one!</p>
          <div className={styles.arrowKeys}>
            <div></div>
            <button
              onClick={() => move('up')}
              className={styles.arrowButton}
              disabled={gameOver || won}
            >
              <IconArrowUp size={20} />
            </button>
            <div></div>
            <button
              onClick={() => move('left')}
              className={styles.arrowButton}
              disabled={gameOver || won}
            >
              <IconArrowLeft size={20} />
            </button>
            <button
              onClick={() => move('down')}
              className={styles.arrowButton}
              disabled={gameOver || won}
            >
              <IconArrowDown size={20} />
            </button>
            <button
              onClick={() => move('right')}
              className={styles.arrowButton}
              disabled={gameOver || won}
            >
              <IconArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className={styles.instructions}>
          <div className={styles.instructionSection}>
            <h4>Game Rules</h4>
            <ul>
              <li>Use arrow keys to move tiles in any direction</li>
              <li>When two tiles with the same number touch, they merge into one</li>
              <li>After each move, a new tile (2 or 4) appears randomly</li>
              <li>The goal is to create a tile with the number 2048</li>
              <li>Game ends when you can't make any more moves</li>
            </ul>
          </div>
          <div className={styles.instructionSection}>
            <h4>Strategy Tips</h4>
            <ul>
              <li>Keep your highest tile in one corner</li>
              <li>Try to build chains of decreasing numbers</li>
              <li>Avoid getting stuck with small tiles in corners</li>
              <li>Plan your moves ahead - think 2-3 moves in advance</li>
              <li>Don't rush - take time to consider each move carefully</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}