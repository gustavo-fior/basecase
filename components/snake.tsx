import { useState, useEffect, useCallback, useRef } from "react";
import { Gamepad } from "lucide-react";
import Draggable from "react-draggable";
import { useKeyboardShortcut } from '../hooks/keyboard-shortcuts';
import { createClient } from '@supabase/supabase-js';

// Constants
const BASE_CELL_SIZE = 15;
const MIN_GRID_SIZE = 30;
const GAME_SPEED = 100;
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// Types
interface Position {
  x: number;
  y: number;
}

interface SnakeGameProps {
  onClose: () => void;
  isMinimized: boolean;
  onMinimize: (minimized: boolean) => void;
}

interface LeaderboardEntry {
  id?: number;
  username: string;
  score: number;
  created_at?: string;
}

// Add Supabase client configuration
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Game
export const SnakeGame: React.FC<SnakeGameProps> = ({ onClose, isMinimized, onMinimize }) => {
  // Refs
  const nodeRef = useRef(null);
  const konamiSequenceRef = useRef<string[]>([]);
  const isProcessingKonamiRef = useRef(false);

  // State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastKonamiCheck, setLastKonamiCheck] = useState<number>(0);
  const [snake, setSnake] = useState<Position[]>([{ x: 15, y: 15 }]);
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState<Position>({ x: 1, y: 0 });
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [highestScore, setHighestScore] = useState<number | null>(null);
  const [showNameInput, setShowNameInput] = useState(false);
  const [username, setUsername] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Add useEffect to load highest score from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('snakeHighestScore');
    if (stored) {
      setHighestScore(parseInt(stored));
    }
  }, []);

  // Add after existing useEffect that loads highest score
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching leaderboard:', error);
        return;
      }

      setLeaderboard(data || []);
    };

    fetchLeaderboard();
  }, []);

  // Game Logic
  const calculateGameDimensions = useCallback(() => {
    if (isFullscreen) {
      const maxWidth = window.innerWidth - 200;
      const maxHeight = window.innerHeight - 100;

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
  }, [isFullscreen]);

  const { gridSize, cellSize } = calculateGameDimensions();

  const generateFood = useCallback(() => {
    const { gridSize } = calculateGameDimensions();
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * (gridSize - 1)),
        y: Math.floor(Math.random() * (gridSize - 1)),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    setFood(newFood);
  }, [snake, calculateGameDimensions]);

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
      const newX = prevSnake[0].x + nextDirection.x;
      const newY = prevSnake[0].y + nextDirection.y;

      // Check for wall collisions
      if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize) {
        setGameOver(true);
        return prevSnake;
      }

      const head = { x: newX, y: newY };

      // Check for self collision
      if (prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const willEatFood = head.x === food.x && head.y === food.y;
      if (willEatFood) {
        setScore(prev => prev + 1);
        generateFood();
      }

      const newSnake = [head, ...prevSnake];
      if (!willEatFood) {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [nextDirection, food, generateFood, gridSize]);

  // Konami Code Handler
  const checkKonamiCode = useCallback((key: string) => {
    const now = Date.now();
    if (now - lastKonamiCheck < 100 || isProcessingKonamiRef.current) return;
    
    setLastKonamiCheck(now);
    
    konamiSequenceRef.current = [...konamiSequenceRef.current, key];
    if (konamiSequenceRef.current.length > KONAMI_CODE.length) {
      konamiSequenceRef.current.shift();
    }
    
    if (konamiSequenceRef.current.length === KONAMI_CODE.length && 
        konamiSequenceRef.current.every((k, i) => k.toLowerCase() === KONAMI_CODE[i].toLowerCase())) {
      isProcessingKonamiRef.current = true;
      setScore(prev => prev * 2);
      konamiSequenceRef.current = [];
      
      setTimeout(() => {
        isProcessingKonamiRef.current = false;
      }, 1000);
    }
  }, [lastKonamiCheck]);

  // Effects
  // Game loop
  useEffect(() => {
    if (!gameOver && gameStarted && !isMinimized) {
      const interval = setInterval(moveSnake, GAME_SPEED);
      return () => clearInterval(interval);
    }
  }, [gameOver, gameStarted, moveSnake, isMinimized]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const { gridSize } = calculateGameDimensions();
      
      const scalePositions = (positions: Position[], oldGridSize: number, newGridSize: number) => {
        return positions.map(pos => ({
          x: Math.min(Math.floor((pos.x / oldGridSize) * newGridSize), newGridSize - 1),
          y: Math.min(Math.floor((pos.y / oldGridSize) * newGridSize), newGridSize - 1),
        }));
      };

      // Scale snake and food positions
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
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateGameDimensions, isFullscreen]);

  // Keyboard Shortcuts
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

  // Add new handler for click outside
  const handleClickOutside = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // Add effect to handle game over score
  useEffect(() => {
    if (gameOver && score > 0) {
      const stored = localStorage.getItem('snakeHighestScore');
      const currentHighest = stored ? parseInt(stored) : 0;
      
      if (score > currentHighest) {
        localStorage.setItem('snakeHighestScore', score.toString());
        setHighestScore(score);
      }
      
      setShowNameInput(true); // Show name input when game ends
    }
  }, [gameOver, score]);

  // Add new function to handle score submission
  const handleScoreSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: LeaderboardEntry = {
      username: username || 'Anonymous',
      score,
    };
    
    const { error } = await supabase
      .from('leaderboard')
      .insert(newEntry);

    if (error) {
      console.error('Error submitting score:', error);
      return;
    }

    // Fetch updated leaderboard
    const { data: updatedLeaderboard } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(10);

    setLeaderboard(updatedLeaderboard || []);
    setShowNameInput(false);
  }, [username, score]);

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
            ${isFullscreen ? "fixed inset-4" : "w-[750px]"}
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

          {/* New Layout: Game Board + Stats Side Panel */}
          <div className="flex-1 flex">
            {/* Game Board Side */}
            <div className="flex items-center justify-center p-4 border-r border-gray-300 dark:border-gray-700">
              <div className="relative">
                <div
                  className="relative border border-gray-300 dark:border-gray-700"
                  style={{
                    width: gridSize * cellSize,
                    height: gridSize * cellSize,
                  }}
                >
                  {/* Add snake segments */}
                  {snake.map((segment, i) => (
                    <div
                      key={i}
                      className={`absolute bg-gray-800 dark:bg-gray-200 ${
                        !gameStarted || gameOver ? "opacity-20" : ""
                      }`}
                      style={{
                        width: cellSize - 1,
                        height: cellSize - 1,
                        left: segment.x * cellSize,
                        top: segment.y * cellSize,
                      }}
                    />
                  ))}

                  {/* Add food */}
                  <div
                    className={`absolute ${!gameStarted || gameOver ? "opacity-20" : ""}`}
                    style={{
                      width: cellSize - 1,
                      height: cellSize - 1,
                      left: food.x * cellSize,
                      top: food.y * cellSize,
                      backgroundColor: "var(--color-primary)",
                    }}
                  />

                  {/* Game over/start overlay remains the same */}
                  {(!gameStarted || gameOver) && (
                    <div className="absolute inset-0 flex items-center justify-center font-mono">
                      <div className="text-center">
                        {!gameStarted && !gameOver && (
                          <>
                            <div className="text-gray-800 dark:text-gray-200">press p to play or pause</div>
                            <div className="text-gray-600 dark:text-gray-400 mt-2">use arrow keys to move</div>
                          </>
                        )}
                        {gameOver && (
                          <>
                            <div className="text-gray-800 dark:text-gray-200">game over</div>
                            {showNameInput ? (
                              <form onSubmit={handleScoreSubmit} className="mt-4 flex flex-col items-center gap-4">
                                <input
                                  type="text"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                  placeholder="enter your name"
                                  className="px-2 py-1 border rounded bg-transparent lowercase"
                                  maxLength={15}
                                  autoFocus
                                />
                                <div className="flex gap-2">
                                  <button
                                    type="submit"
                                    className="px-3 py-1 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded lowercase"
                                  >
                                    submit score
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setShowNameInput(false)}
                                    className="px-3 py-1 border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 rounded lowercase"
                                  >
                                    skip
                                  </button>
                                </div>
                              </form>
                            ) : (
                              <div className="text-gray-600 dark:text-gray-400 mt-2">
                                press r to restart
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Side */}
            <div className="w-[250px] flex flex-col p-6 font-mono">
              {/* Current Score */}
              <div className="mb-8">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 lowercase">current score</div>
                <div className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                  {score}
                  {highestScore !== null && score > highestScore && (
                    <span className="text-sm text-emerald-500 ml-2 animate-pulse">new high!</span>
                  )}
                </div>
              </div>

              {/* Best Score */}
              <div className="mb-8">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 lowercase">best score</div>
                <div className="text-2xl text-gray-800 dark:text-gray-200">
                  {highestScore || 0}
                </div>
              </div>

              {/* Leaderboard */}
              <div className="flex-1">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 lowercase">global leaderboard</div>
                <div className="space-y-2">
                  {leaderboard.slice(0, 5).map((entry, i) => (
                    <div 
                      key={i}
                      className={`
                        flex items-center justify-between text-sm lowercase
                        ${entry.score === score ? '[color:var(--color-primary)]' : 'text-gray-800 dark:text-gray-200'}
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 w-4">{i + 1}</span>
                        <span>{entry.username.toLowerCase()}</span>
                      </div>
                      <span className="font-bold">{entry.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls Help */}
              <div className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400 lowercase space-y-1">
                  <div>p - play/pause</div>
                  <div>r - restart</div>
                  <div>arrows - move</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default SnakeGame;
