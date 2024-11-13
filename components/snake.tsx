import { useState, useEffect, useCallback, useRef } from "react";
import { Gamepad } from "lucide-react";
import Draggable from "react-draggable";
import { useKeyboardShortcut } from '../hooks/keyboard-shortcuts';

// Base size constants
const BASE_CELL_SIZE = 15;
const MIN_GRID_SIZE = 30;
const GAME_SPEED = 100; // milliseconds between each move (lower = faster)

// Update the props interface
interface SnakeGameProps {
  onClose: () => void;
  isMinimized: boolean;
  onMinimize: (minimized: boolean) => void;
}

// Add this near the top with other constants
interface Position {
  x: number;
  y: number;
}

export const SnakeGame: React.FC<SnakeGameProps> = ({
  onClose,
  isMinimized,
  onMinimize,
}) => {

  const nodeRef = useRef(null);
  const konamiSequenceRef = useRef<string[]>([]);
  const isProcessingKonamiRef = useRef(false);

  // Move ALL hooks to the top, before any returns
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastKonamiCheck, setLastKonamiCheck] = useState<number>(0);

  const calculateGameDimensions = useCallback(() => {
    if (isFullscreen) {
      const maxWidth = window.innerWidth - 200;
      const maxHeight = window.innerHeight - 200;

      const horizontalCells = Math.floor(maxWidth / BASE_CELL_SIZE);
      const verticalCells = Math.floor(maxHeight / BASE_CELL_SIZE);

      return {
        gridSize: Math.max(
          Math.min(horizontalCells, verticalCells),
          MIN_GRID_SIZE
        ),
        cellSize: BASE_CELL_SIZE,
      };
    }
    return { gridSize: MIN_GRID_SIZE, cellSize: BASE_CELL_SIZE };
  }, [isFullscreen]); // Fix: Add dependency

  const { gridSize, cellSize } = calculateGameDimensions();

  // Now we can use gridSize in our hooks
  const [snake, setSnake] = useState<Position[]>([{ x: 15, y: 15 }]);
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameLoop, setGameLoop] = useState<NodeJS.Timeout | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [nextDirection, setNextDirection] = useState<Position>({ x: 1, y: 0 });

  // Move the keyboard shortcuts hook here, before any returns
  useKeyboardShortcut({
    handlers: [
      {
        key: 'Escape',
        handler: () => onClose(),
        description: 'Close game'
      },
      {
        key: 'm',
        handler: () => onMinimize(!isMinimized),
        description: 'Minimize window'
      },
      {
        key: 'f',
        handler: () => setIsFullscreen(prev => !prev),
        description: 'Toggle fullscreen'
      },
      {
        key: 'p',
        handler: () => setGameStarted(prev => !prev),
        description: 'Play/Pause game'
      },
      {
        key: 'r',
        handler: () => {
          if (gameOver) {
            resetGame();
          }
        },
        description: 'Restart game when game over'
      },
      {
        key: 'ArrowUp',
        handler: () => {
          checkKonamiCode('ArrowUp');
          const newDirection = { x: 0, y: -1 };
          if (newDirection.x !== -direction.x || newDirection.y !== -direction.y) {
            setNextDirection(newDirection);
          }
        },
        description: 'Move up'
      },
      {
        key: 'ArrowDown',
        handler: () => {
          checkKonamiCode('ArrowDown');
          const newDirection = { x: 0, y: 1 };
          if (newDirection.x !== -direction.x || newDirection.y !== -direction.y) {
            setNextDirection(newDirection);
          }
        },
        description: 'Move down'
      },
      {
        key: 'ArrowLeft',
        handler: () => {
          checkKonamiCode('ArrowLeft');
          const newDirection = { x: -1, y: 0 };
          if (newDirection.x !== -direction.x || newDirection.y !== -direction.y) {
            setNextDirection(newDirection);
          }
        },
        description: 'Move left'
      },
      {
        key: 'ArrowRight',
        handler: () => {
          checkKonamiCode('ArrowRight');
          const newDirection = { x: 1, y: 0 };
          if (newDirection.x !== -direction.x || newDirection.y !== -direction.y) {
            setNextDirection(newDirection);
          }
        },
        description: 'Move right'
      },
      {
        key: 'a',
        handler: () => {
          checkKonamiCode('a');
        },
        description: 'Konami code A'
      },
      {
        key: 'b',
        handler: () => {
          checkKonamiCode('b');
        },
        description: 'Konami code B'
      }
    ]
  });

  // Add Konami code check function
  const checkKonamiCode = useCallback((key: string) => {
    const now = Date.now();
    if (now - lastKonamiCheck < 100) {
      return; // Prevent double execution
    }
    setLastKonamiCheck(now);
    
    if (isProcessingKonamiRef.current) {
      return;
    }

    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    konamiSequenceRef.current = [...konamiSequenceRef.current, key];
    if (konamiSequenceRef.current.length > konamiCode.length) {
      konamiSequenceRef.current.shift();
    }
    
    // Check if the sequence matches the Konami code
    if (konamiSequenceRef.current.length === konamiCode.length && 
        konamiSequenceRef.current.every((k, i) => k.toLowerCase() === konamiCode[i].toLowerCase())) {
      isProcessingKonamiRef.current = true;
      setScore(prev => prev * 2); // Double the score
      konamiSequenceRef.current = []; // Reset sequence
      
      // Reset the processing flag after a delay
      setTimeout(() => {
        isProcessingKonamiRef.current = false;
      }, 1000);
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      // No cleanup needed
    };
  }, []);

  // Fix: Update generateFood to use current gridSize
  const generateFood = useCallback(() => {
    const { gridSize } = calculateGameDimensions();
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * (gridSize - 1)),
        y: Math.floor(Math.random() * (gridSize - 1)),
      };
    } while (
      snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    setFood(newFood);
  }, [snake, calculateGameDimensions]);

  // Fix: Update initial snake position based on gridSize
  const resetGame = useCallback(() => {
    const startPos = Math.floor(gridSize / 3);
    setSnake([{ x: startPos, y: startPos }]);
    setDirection({ x: 1, y: 0 });
    setNextDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    generateFood();
  }, [generateFood, gridSize]);

  const moveSnake = useCallback(() => {
    setDirection(nextDirection);

    setSnake((prevSnake) => {
      // Calculate new head position
      const newX = prevSnake[0].x + nextDirection.x;
      const newY = prevSnake[0].y + nextDirection.y;

      // Check for wall collisions
      if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize) {
        setGameOver(true);
        return prevSnake;
      }

      const head = { x: newX, y: newY };

      // Check for self collision
      if (
        prevSnake.some(
          (segment) => segment.x === head.x && segment.y === head.y
        )
      ) {
        setGameOver(true);
        return prevSnake;
      }

      const willEatFood = head.x === food.x && head.y === food.y;
      const newSnake = [head, ...prevSnake];
      if (!willEatFood) {
        newSnake.pop();
      } else {
        generateFood();
      }

      return newSnake;
    });

    if (snake[0].x + nextDirection.x === food.x && snake[0].y + nextDirection.y === food.y) {
      setScore((prev) => prev + 1);
    }
  }, [nextDirection, food, generateFood, gridSize, snake]);

  useEffect(() => {
    if (!gameOver && gameStarted && !isMinimized) {
      const interval = setInterval(moveSnake, GAME_SPEED);
      setGameLoop(interval);
      return () => clearInterval(interval);
    } else if (gameLoop) {
      clearInterval(gameLoop);
    }
  }, [gameOver, gameStarted, moveSnake, isMinimized]);

  // Recalculate on window resize or fullscreen change
  useEffect(() => {
    const handleResize = () => {
      const { gridSize, cellSize } = calculateGameDimensions();
      
      // Scale the positions based on the new grid size ratio
      const scalePositions = (positions: Position[], oldGridSize: number, newGridSize: number) => {
        return positions.map(pos => ({
          x: Math.min(Math.floor((pos.x / oldGridSize) * newGridSize), newGridSize - 1),
          y: Math.min(Math.floor((pos.y / oldGridSize) * newGridSize), newGridSize - 1),
        }));
      };

      setSnake(prev => {
        const oldGridSize = Math.max(MIN_GRID_SIZE, prev.length > 0 ? Math.max(...prev.map(p => Math.max(p.x, p.y))) + 1 : MIN_GRID_SIZE);
        return scalePositions(prev, oldGridSize, gridSize);
      });

      setFood(prev => {
        const oldGridSize = Math.max(MIN_GRID_SIZE, Math.max(prev.x, prev.y) + 1);
        return scalePositions([prev], oldGridSize, gridSize)[0];
      });
    };

    window.addEventListener("resize", handleResize);
    // Also trigger resize when fullscreen changes
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateGameDimensions, isFullscreen]); // Add isFullscreen as dependency

  useEffect(() => {
    return () => {
      if (gameLoop) {
        clearInterval(gameLoop);
      }
    };
  }, []);

  // Add new handler for click outside
  const handleClickOutside = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // Now the conditional return is safe
  if (isMinimized) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={handleClickOutside}
    >
      <Draggable
        handle=".drag-handle"
        bounds="parent"
        nodeRef={nodeRef}
        position={isFullscreen ? { x: 0, y: 0 } : position}
        onDrag={(e, data) => {
          if (!isFullscreen) {
            setPosition({ x: data.x, y: data.y });
          }
        }}
      >
        <div
          ref={nodeRef}
          className={`
            ${isFullscreen ? "fixed inset-4" : `w-[${gridSize * cellSize + 4}px]`}
            flex flex-col
            border border-gray-300 dark:border-gray-700
            [background-color:var(--color-background-light)]
            dark:[background-color:var(--color-background-dark)]
          `}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 p-2 drag-handle cursor-grab active:cursor-grabbing">
            <div className="flex items-center gap-2 font-mono text-sm">
              <Gamepad className="w-4 h-4 text-gray-500" />
              <span>snake game</span>
            </div>
            <div className="flex gap-2 font-mono">
              <button
                onClick={() => onMinimize(true)}
                className="px-2 hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                -
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="px-2 hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                {isFullscreen ? "⊡" : "□"}
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
                className="relative border border-gray-300 dark:border-gray-700"
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
                          press p to play or pause
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 mt-2">
                          use arrow keys to move
                        </div>
                      </>
                    )}
                    {gameOver && (
                      <>
                        <div className="text-gray-800 dark:text-gray-200">
                          game over
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 mt-2">
                          press r to restart
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
                        className={`absolute bg-gray-800 dark:bg-gray-200 ${
                          gameOver ? "opacity-20" : ""
                        }`}
                        style={{
                          width: cellSize - 1,
                          height: cellSize - 1,
                          left: segment.x * cellSize,
                          top: segment.y * cellSize,
                        }}
                      />
                    ))}
                    <div
                      className={`absolute ${gameOver ? "opacity-20" : ""}`}
                      style={{
                        width: cellSize - 1,
                        height: cellSize - 1,
                        left: food.x * cellSize,
                        top: food.y * cellSize,
                        backgroundColor: "var(--color-primary)",
                      }}
                    />
                  </>
                )}
              </div>

              {/* Score */}
              <div className="mt-2 font-mono text-sm text-gray-800 dark:text-gray-200">
                score: {score}
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default SnakeGame;
