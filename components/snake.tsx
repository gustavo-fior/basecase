import React, { useState, useEffect, useCallback } from "react";
import { Gamepad } from "lucide-react";

// Base size constants
const BASE_CELL_SIZE = 15;
const MIN_GRID_SIZE = 30;
const INITIAL_SNAKE = [{ x: 15, y: 15 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

export const SnakeGame = ({ onClose }: { onClose: () => void }) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 15, y: 10 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameLoop, setGameLoop] = useState<NodeJS.Timeout | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [nextDirection, setNextDirection] = useState(INITIAL_DIRECTION);

  const generateFood = useCallback(() => {
    const { gridSize } = calculateGameDimensions();
    const newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
    setFood(newFood);
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    generateFood();
  }, [generateFood]);

  const moveSnake = useCallback(() => {
    setDirection(nextDirection);
    
    setSnake((prevSnake) => {
      const head = {
        x: prevSnake[0].x + nextDirection.x,
        y: prevSnake[0].y + nextDirection.y,
      };

      const { gridSize } = calculateGameDimensions();
      
      if (
        head.x < 0 ||
        head.x >= gridSize ||
        head.y < 0 ||
        head.y >= gridSize
      ) {
        setGameOver(true);
        return prevSnake;
      }

      const willEatFood = head.x === food.x && head.y === food.y;
      const snakeWithoutTail = willEatFood ? prevSnake : prevSnake.slice(0, -1);
      
      if (snakeWithoutTail.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];
      if (!willEatFood) {
        newSnake.pop();
      } else {
        setScore((prev) => prev + 1);
        generateFood();
      }

      return newSnake;
    });
  }, [nextDirection, food, generateFood]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (!gameStarted && key === "p") {
        e.preventDefault();
        setGameStarted(true);
        return;
      }

      if (gameOver && key === "r") {
        e.preventDefault();
        resetGame();
        return;
      }

      const newDirection = {
        arrowup: { x: 0, y: -1 },
        arrowdown: { x: 0, y: 1 },
        arrowleft: { x: -1, y: 0 },
        arrowright: { x: 1, y: 0 },
      }[key];

      if (newDirection) {
        e.preventDefault();
        const isOpposite =
          newDirection.x === -direction.x && newDirection.y === -direction.y;

        if (!isOpposite) {
          setNextDirection(newDirection);
        }
      }
    },
    [direction, gameOver, gameStarted, onClose, resetGame]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!gameOver && gameStarted) {
      const interval = setInterval(moveSnake, GAME_SPEED);
      setGameLoop(interval);
      return () => clearInterval(interval);
    } else if (gameLoop) {
      clearInterval(gameLoop);
    }
  }, [gameOver, gameStarted, moveSnake]);

  // Calculate grid size based on window size and fullscreen state
  const calculateGameDimensions = () => {
    if (isFullscreen) {
      // Calculate the available space with padding
      const maxWidth = window.innerWidth - 200; // Increased padding
      const maxHeight = window.innerHeight - 200; // Increased padding
      
      // Calculate how many cells we can fit while maintaining square cells
      const horizontalCells = Math.floor(maxWidth / BASE_CELL_SIZE);
      const verticalCells = Math.floor(maxHeight / BASE_CELL_SIZE);
      
      // Use the smaller dimension to ensure a square grid
      const gridSize = Math.max(
        Math.min(horizontalCells, verticalCells),
        MIN_GRID_SIZE // Ensure we don't go smaller than minimum grid size
      );

      return { gridSize, cellSize: BASE_CELL_SIZE };
    }
    return { gridSize: MIN_GRID_SIZE, cellSize: BASE_CELL_SIZE };
  };

  const { gridSize, cellSize } = calculateGameDimensions();

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      const { gridSize } = calculateGameDimensions();
      // Update snake and food positions
      setSnake(prev => prev.map(segment => ({
        x: Math.min(segment.x, gridSize - 1),
        y: Math.min(segment.y, gridSize - 1)
      })));
      setFood(prev => ({
        x: Math.min(prev.x, gridSize - 1),
        y: Math.min(prev.y, gridSize - 1)
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFullscreen]);

  useEffect(() => {
    return () => {
      if (gameLoop) {
        clearInterval(gameLoop);
      }
    };
  }, []);

  // Add new handler for click outside
  const handleClickOutside = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={handleClickOutside}
    >
      <div className={`
        ${isFullscreen ? 'fixed inset-4' : `w-[${gridSize * cellSize + 4}px]`}
        flex flex-col
        border border-gray-800 dark:border-gray-200
        [background-color:var(--color-background-light)]
        dark:[background-color:var(--color-background-dark)]
      `}>
        {/* Title Bar */}
        <div className="flex items-center justify-between border-b border-gray-800 dark:border-gray-200 p-2">
          <div className="flex items-center gap-2 font-mono text-sm">
            <Gamepad className="w-4 h-4 text-gray-500" />
            <span>Snake Game</span>
          </div>
          <div className="flex gap-2 font-mono">
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="px-2 hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              {isFullscreen ? '□' : '⊡'}
            </button>
            <button 
              onClick={onClose}
              className="px-2 hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              ×
            </button>
          </div>
        </div>

        {/* Game Board and Score Container */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="flex flex-col">
            <div 
              className="relative border border-gray-800 dark:border-gray-200"
              style={{
                width: gridSize * cellSize,
                height: gridSize * cellSize,
              }}
            >
              {(!gameStarted || gameOver) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono z-10">
                  {!gameStarted && !gameOver && (
                    <>
                      <div className="text-gray-800 dark:text-gray-200">
                        Press P to play
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 mt-2">
                        Use arrow keys to move
                      </div>
                    </>
                  )}
                  {gameOver && (
                    <>
                      <div className="text-gray-800 dark:text-gray-200">
                        GAME OVER
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 mt-2">
                        Press R to restart
                      </div>
                    </>
                  )}
                </div>
              )}
              
              {gameStarted && (
                <>
                  {snake.map((segment, i) => (
                    <div
                      key={i}
                      className="absolute bg-gray-800 dark:bg-gray-200"
                      style={{
                        width: cellSize - 1,
                        height: cellSize - 1,
                        left: segment.x * cellSize,
                        top: segment.y * cellSize,
                      }}
                    />
                  ))}
                  <div
                    className="absolute"
                    style={{
                      width: cellSize - 1,
                      height: cellSize - 1,
                      left: food.x * cellSize,
                      top: food.y * cellSize,
                      backgroundColor: 'var(--color-primary)'
                    }}
                  />
                </>
              )}
            </div>
            
            {/* Score */}
            <div className="mt-2 font-mono text-sm text-gray-800 dark:text-gray-200">
              Score: {score}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
