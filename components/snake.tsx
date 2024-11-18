import { useState, useEffect, useCallback, useRef } from "react";
import { Gamepad } from "lucide-react";
import Draggable from "react-draggable";
import { useKeyboardShortcut } from "../hooks/keyboard-shortcuts";
import { createClient } from "@supabase/supabase-js";

// Constants
const BASE_CELL_SIZE = 15;
const MIN_GRID_SIZE = 30;
const GAME_SPEED = 100;
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

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
  submitted_at?: string;
}

interface Direction {
  x: number;
  y: number;
}

// Services
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Game
export const SnakeGame: React.FC<SnakeGameProps> = ({
  onClose,
  isMinimized,
  onMinimize,
}) => {
  // Refs
  const nodeRef = useRef(null);
  const konamiSequenceRef = useRef<string[]>([]);
  const isProcessingKonamiRef = useRef(false);

  // State
  // Game State
  const [snake, setSnake] = useState<Position[]>([{ x: 15, y: 15 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState<Position>({ x: 1, y: 0 });
  const [directionQueue, setDirectionQueue] = useState<Direction[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameToken, setGameToken] = useState<string>("");
  // UI State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Score State
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState<number | null>(null);
  const [showNameInput, setShowNameInput] = useState(false);
  const [username, setUsername] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Konami Code State
  const [lastKonamiCheck, setLastKonamiCheck] = useState<number>(0);
  const [konamiUsed, setKonamiUsed] = useState(false);
  const [showKonamiMessage, setShowKonamiMessage] = useState(false);

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
    } while (
      snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    setFood(newFood);
  }, [snake, calculateGameDimensions]);

  const resetGame = useCallback(() => {
    const startPos = Math.floor(gridSize / 3);
    setSnake([{ x: startPos, y: startPos }]);
    setDirection({ x: 1, y: 0 });
    setNextDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setErrorMessage("");
    setKonamiUsed(false);
    setGameToken("");
    generateFood();
  }, [generateFood, gridSize]);

  const moveSnake = useCallback(() => {
    // Process next direction from queue if available
    if (directionQueue.length > 0) {
      const nextDir = directionQueue[0];
      setDirection(nextDir);
      setNextDirection(nextDir);
      setDirectionQueue((prevQueue) => prevQueue.slice(1));
    }

    setSnake((prevSnake) => {
      // Calculate new head position
      const newHead = {
        x: prevSnake[0].x + nextDirection.x,
        y: prevSnake[0].y + nextDirection.y,
      };

      // Check for wall collisions
      if (
        newHead.x < 0 ||
        newHead.x >= gridSize ||
        newHead.y < 0 ||
        newHead.y >= gridSize
      ) {
        setGameOver(true);
        return prevSnake;
      }

      // Check for self collision (excluding the tail which will move)
      if (
        prevSnake
          .slice(0, -1)
          .some((segment) => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setGameOver(true);
        return prevSnake;
      }

      // Check if we're about to eat food
      const eatingFood = newHead.x === food.x && newHead.y === food.y;

      if (eatingFood) {
        setScore((prev) => prev + 1);
        generateFood();
        // Return new snake with new head and keeping the entire tail
        return [newHead, ...prevSnake];
      }

      // Regular movement - return new snake with new head and remove tail
      return [newHead, ...prevSnake.slice(0, -1)];
    });
  }, [nextDirection, food, generateFood, gridSize, directionQueue]);

  // Konami Code Handler
  const checkKonamiCode = useCallback(
    (key: string) => {
      // Return early if Konami code was already used
      if (konamiUsed) return;

      const now = Date.now();
      if (now - lastKonamiCheck < 100 || isProcessingKonamiRef.current) return;

      setLastKonamiCheck(now);

      konamiSequenceRef.current = [...konamiSequenceRef.current, key];
      if (konamiSequenceRef.current.length > KONAMI_CODE.length) {
        konamiSequenceRef.current.shift();
      }

      if (
        konamiSequenceRef.current.length === KONAMI_CODE.length &&
        konamiSequenceRef.current.every(
          (k, i) => k.toLowerCase() === KONAMI_CODE[i].toLowerCase()
        )
      ) {
        isProcessingKonamiRef.current = true;
        setScore((prev) => prev * 2);
        setKonamiUsed(true); // Mark Konami code as used
        konamiSequenceRef.current = [];

        setTimeout(() => {
          isProcessingKonamiRef.current = false;
        }, 1000);
      }
    },
    [lastKonamiCheck, konamiUsed]
  );

  // Modify direction change handlers in keyboard shortcuts
  const addDirectionToQueue = useCallback(
    (newDirection: Direction) => {
      // Only add direction if it's different from the last queued direction
      // and not opposite to the current direction
      setDirectionQueue((prevQueue) => {
        const lastDirection =
          prevQueue.length > 0 ? prevQueue[prevQueue.length - 1] : direction;

        const isOpposite =
          newDirection.x === -lastDirection.x &&
          newDirection.y === -lastDirection.y;

        const isSameAsLast =
          newDirection.x === lastDirection.x &&
          newDirection.y === lastDirection.y;

        if (!isOpposite && !isSameAsLast) {
          // Limit queue size to prevent memory issues
          const newQueue = [...prevQueue, newDirection].slice(-3);
          return newQueue;
        }
        return prevQueue;
      });
    },
    [direction]
  );

  // Add new handler for click outside
  const handleClickOutside = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // Update handleScoreSubmit to handle localStorage
  const handleScoreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add client-side validation
    if (!username?.trim() || username.length < 2 || username.length > 10) {
      setErrorMessage("username must be between 2 and 10 characters");
      return;
    }

    if (!gameToken) {
      setErrorMessage("invalid game session");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          score,
          gameToken,
        }),
      });

      const data = await response.json();

      // Save username to localStorage
      localStorage.setItem("snakeLastUsername", username);

      // If there's a message, show it and return early
      if (data.message) {
        setErrorMessage(data.message);
        return;
      }

      // Only update localStorage if submission was successful
      const storedScore = localStorage.getItem("snakeHighestScore");
      const currentHighest = storedScore ? parseInt(storedScore) : 0;
      if (score > currentHighest) {
        localStorage.setItem("snakeHighestScore", score.toString());
        setHighestScore(score);
      }

      // Update leaderboard and close input form
      const { data: updatedLeaderboard } = await supabase
        .from("leaderboard")
        .select("*")
        .order("score", { ascending: false })
        .limit(10);

      setLeaderboard(updatedLeaderboard || []);
      setShowNameInput(false);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("failed to submit score");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keyboard Shortcuts
  useKeyboardShortcut({
    handlers: [
      {
        key: "Escape",
        handler: () => onClose(),
        description: "Close game",
      },
      {
        key: "m",
        handler: () => onMinimize(!isMinimized),
        description: "Minimize window",
      },
      {
        key: "f",
        handler: () => setIsFullscreen((prev) => !prev),
        description: "Toggle fullscreen",
      },
      {
        key: "p",
        handler: () => setGameStarted((prev) => !prev),
        description: "Play/Pause game",
      },
      {
        key: "r",
        handler: () => {
          if (gameOver) {
            resetGame();
          }
        },
        description: "Restart game when game over",
      },
      {
        key: "ArrowUp",
        handler: () => {
          checkKonamiCode("ArrowUp");
          addDirectionToQueue({ x: 0, y: -1 });
        },
        description: "Move up",
      },
      {
        key: "ArrowDown",
        handler: () => {
          checkKonamiCode("ArrowDown");
          addDirectionToQueue({ x: 0, y: 1 });
        },
        description: "Move down",
      },
      {
        key: "ArrowLeft",
        handler: () => {
          checkKonamiCode("ArrowLeft");
          addDirectionToQueue({ x: -1, y: 0 });
        },
        description: "Move left",
      },
      {
        key: "ArrowRight",
        handler: () => {
          checkKonamiCode("ArrowRight");
          addDirectionToQueue({ x: 1, y: 0 });
        },
        description: "Move right",
      },
      {
        key: "a",
        handler: () => {
          checkKonamiCode("a");
        },
        description: "Konami code A",
      },
      {
        key: "b",
        handler: () => {
          checkKonamiCode("b");
        },
        description: "Konami code B",
      },
    ],
  });

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

      const scalePositions = (
        positions: Position[],
        oldGridSize: number,
        newGridSize: number
      ) => {
        return positions.map((pos) => ({
          x: Math.min(
            Math.floor((pos.x / oldGridSize) * newGridSize),
            newGridSize - 1
          ),
          y: Math.min(
            Math.floor((pos.y / oldGridSize) * newGridSize),
            newGridSize - 1
          ),
        }));
      };

      // Scale snake and food positions
      setSnake((prev) => {
        const oldGridSize = Math.max(
          MIN_GRID_SIZE,
          prev.length > 0
            ? Math.max(...prev.map((p) => Math.max(p.x, p.y))) + 1
            : MIN_GRID_SIZE
        );
        return scalePositions(prev, oldGridSize, gridSize);
      });

      setFood((prev) => {
        const oldGridSize = Math.max(
          MIN_GRID_SIZE,
          Math.max(prev.x, prev.y) + 1
        );
        return scalePositions([prev], oldGridSize, gridSize)[0];
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [calculateGameDimensions, isFullscreen]);

  // Load highest score from localStorage on mount
  useEffect(() => {
    const storedScore = localStorage.getItem("snakeHighestScore");
    const storedUsername = localStorage.getItem("snakeLastUsername");

    if (storedScore) {
      setHighestScore(parseInt(storedScore));
    }
    if (storedUsername) {
      setUsername(storedUsername); // Just set the username directly
    }
  }, []);

  // Leaderboard
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("*")
        .order("score", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching leaderboard:", error);
        return;
      }

      setLeaderboard(data || []);
    };

    // Initial fetch
    fetchLeaderboard();

    // Set up interval to fetch every 30 seconds
    const interval = setInterval(fetchLeaderboard, 30000);

    // Cleanup interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Game over score
  useEffect(() => {
    if (gameOver && score > 0) {
      setShowNameInput(true);
      setErrorMessage("");
    }
  }, [gameOver, score]);

  // Live blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 1000);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Konami bonus indicator
  useEffect(() => {
    if (konamiUsed) {
      setShowKonamiMessage(true);
      const timer = setTimeout(() => {
        setShowKonamiMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [konamiUsed]);

  // Pause game when minimized
  useEffect(() => {
    if (isMinimized) {
      setGameStarted(false);
    }
  }, [isMinimized]);

  // Reset game token when game starts
  useEffect(() => {
    if (!gameOver && gameStarted) {
      const startGame = async () => {
        try {
          const response = await fetch("/api/start-game", {
            method: "POST",
          });

          if (!response.ok) {
            throw new Error("Failed to start game");
          }

          const data = await response.json();
          setGameToken(data.token);
        } catch (error) {
          console.error("Failed to start game:", error);
          setErrorMessage("failed to start game");
          setGameStarted(false);
        }
      };

      startGame();
    }
  }, [gameStarted, gameOver]);

  // Hide game when minimized
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

          {/* Game Board + Stats Side Panel */}
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
                  {/* Snake segments */}
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
                    className={`absolute ${
                      !gameStarted || gameOver ? "opacity-20" : ""
                    }`}
                    style={{
                      width: cellSize - 1,
                      height: cellSize - 1,
                      left: food.x * cellSize,
                      top: food.y * cellSize,
                      backgroundColor: "var(--color-primary)",
                    }}
                  />
                  {/* Game over/start overlay */}
                  {(!gameStarted || gameOver) && (
                    <div className="absolute inset-0 flex items-center justify-center font-mono">
                      <div className="text-center">
                        {!gameStarted && !gameOver && (
                          <div className="h-[125px]">
                            <div className="text-gray-800 dark:text-gray-200">
                              press p to play or pause
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 mt-2">
                              use arrow keys to move
                            </div>
                          </div>
                        )}
                        {gameOver && (
                          <div className="h-[125px]">
                            <div className="text-gray-800 dark:text-gray-200">
                              game over
                            </div>
                            {showNameInput ? (
                              <form
                                onSubmit={handleScoreSubmit}
                                className="mt-4 flex flex-col items-center gap-2"
                              >
                                <div className="flex flex-col items-center">
                                  <input
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                      setUsername(e.target.value)
                                    }
                                    placeholder="username"
                                    className="px-2 py-1 border rounded bg-transparent lowercase w-[250px]"
                                    maxLength={10}
                                    autoFocus
                                    autoComplete="off"
                                  />
                                  {errorMessage && (
                                    <p className="text-red-500 text-xs py-1 transition-opacity duration-200">
                                      {errorMessage}
                                    </p>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-3 py-1 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded lowercase w-[160px] ${
                                      isSubmitting
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                  >
                                    {isSubmitting
                                      ? "submitting..."
                                      : "submit score"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setUsername("");
                                      setShowNameInput(false);
                                      setErrorMessage("");
                                    }}
                                    className="px-3 py-1 border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 rounded lowercase w-[82px]"
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
                          </div>
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
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 lowercase">
                  current score
                </div>
                <div className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                  {score}
                  {highestScore !== null && score > highestScore && (
                    <span className="text-sm text-emerald-500 ml-2 animate-pulse">
                      new high!
                    </span>
                  )}
                  {showKonamiMessage && (
                    <span className="text-sm ml-2 animate-pulse" style={{ color: 'var(--color-primary)' }}>
                      konami bonus!
                    </span>
                  )}
                </div>
              </div>

              {/* High Score */}
              <div className="mb-8">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 lowercase">
                  high score
                </div>
                <div className="text-2xl text-gray-800 dark:text-gray-200">
                  {highestScore || 0}
                </div>
              </div>

              {/* Leaderboard */}
              <div className="flex-1">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 lowercase">
                  leaderboard
                </div>
                <div className="space-y-2">
                  {leaderboard.slice(0, 5).map((entry, i) => {
                    const isActive =
                      entry.submitted_at &&
                      new Date().getTime() -
                        new Date(entry.submitted_at).getTime() <
                        120000;
                    return (
                      <div
                        key={i}
                        className={`
                          flex items-center justify-between text-sm lowercase
                          ${
                            entry.score === score
                              ? "[color:var(--color-primary)]"
                              : "text-gray-800 dark:text-gray-200"
                          }
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 w-4">{i + 1}</span>
                          <span>{entry.username.toLowerCase()}</span>
                          {isActive && (
                            <div
                              className={`w-2 h-2 rounded-full bg-green-500 ${
                                isBlinking ? "opacity-100" : "opacity-50"
                              } transition-opacity duration-150`}
                            />
                          )}
                        </div>
                        <span className="font-bold">{entry.score}</span>
                      </div>
                    );
                  })}
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
