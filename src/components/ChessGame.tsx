import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, User, RotateCcw, Maximize, Minimize, Clock, MessageCircle, Zap, Volume2, VolumeX } from 'lucide-react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useStockfish } from '../hooks/useStockfish';
import { useChessAudio } from '../hooks/useChessAudio';

interface ChessGameProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GameState {
  playerName: string;
  playerGender: 'male' | 'female' | '';
  playerColor: 'white' | 'black';
  gameStarted: boolean;
  isFullscreen: boolean;
  game: Chess;
  gamePosition: string;
  moveHistory: string[];
  gameStatus: string;
  isPlayerTurn: boolean;
  botThinking: boolean;
  lastMove: { from: string; to: string } | null;
  botMessage: string;
  showBotMessage: boolean;
  selectedSquares: string[];
  soundEnabled: boolean;
  speechEnabled: boolean;
  moveCount: number;
}

const ChessGame: React.FC<ChessGameProps> = ({ isOpen, onClose }) => {
  const [gameState, setGameState] = useState<GameState>({
    playerName: '',
    playerGender: '',
    playerColor: 'white',
    gameStarted: false,
    isFullscreen: false,
    game: new Chess(),
    gamePosition: new Chess().fen(),
    moveHistory: [],
    gameStatus: 'Game in progress',
    isPlayerTurn: true,
    botThinking: false,
    lastMove: null,
    botMessage: '',
    showBotMessage: false,
    selectedSquares: [],
    soundEnabled: true,
    speechEnabled: true,
    moveCount: 0,
  });

  const { requestMove, isReady, engineStrength, analysisDepth } = useStockfish();
  const { playMoveSound, speakTrashTalk, stopSpeaking } = useChessAudio();
  const boardRef = useRef<any>(null);

  // Enhanced trash talk messages based on gender
  const maleTrashTalk = [
    "That was pathetic. Watch and learn.",
    "Is that seriously your best move?",
    "I've seen beginners play better than this.",
    "You're getting destroyed by a computer. How does that feel?",
    "That move was so bad, I almost felt sorry for you.",
    "Are you even trying? This is embarrassing.",
    "I calculated that blunder 5 moves ago.",
    "You just walked into my trap. Amateur.",
    "This is what 3000 ELO looks like, kid.",
    "Your position is hopeless. Just resign already.",
    "I'm not even using my full power yet.",
    "That move made me laugh. Literally.",
    "You're playing like you learned chess yesterday.",
    "I've seen chess engines from 1990 play better.",
    "Your king is about to get mated. Badly.",
    "This is too easy. Give me a real challenge.",
    "You just blundered your entire game away.",
    "I'm calculating mate while you're moving randomly.",
    "That was the worst move possible in that position.",
    "You're getting schooled by silicon and code."
  ];

  const femaleTrashTalk = [
    "That was an interesting choice, but I have a better idea.",
    "Oh sweetie, let me show you how it's done.",
    "That move was cute, but watch this.",
    "I appreciate the creativity, but here's the right way.",
    "You're learning! But I'm still going to win.",
    "That was brave, but not quite right.",
    "I can see what you were trying to do there.",
    "Nice try! But I've got something special planned.",
    "You're getting better, but I'm still ahead.",
    "That was a good attempt, dear.",
    "I like your fighting spirit, but this is my game.",
    "You're making this fun, but I'm still winning.",
    "That move had potential, but here's perfection.",
    "I can see you're thinking hard. Keep trying!",
    "You're playing well, but I'm playing better.",
    "That was almost good. Almost.",
    "I respect the effort, but watch this move.",
    "You're improving, but I'm still the master here.",
    "That was thoughtful, but I have the answer.",
    "Good game so far, but I'm about to end it."
  ];

  const startGame = () => {
    if (gameState.playerName.trim() && gameState.playerGender) {
      const newGame = new Chess();
      setGameState(prev => ({
        ...prev,
        gameStarted: true,
        game: newGame,
        gamePosition: newGame.fen(),
        moveHistory: [],
        gameStatus: 'Game in progress',
        isPlayerTurn: prev.playerColor === 'white',
        botThinking: false,
        lastMove: null,
        botMessage: '',
        showBotMessage: false,
        selectedSquares: [],
        moveCount: 0,
      }));

      // Initial greeting based on gender
      setTimeout(() => {
        const greeting = gameState.playerGender === 'female' 
          ? `Hello ${gameState.playerName}! Ready for a friendly game?`
          : `Alright ${gameState.playerName}, prepare to get crushed!`;
        
        showBotPersonality(greeting);
      }, 1000);

      // If player is black, make first move for white (bot)
      if (gameState.playerColor === 'black') {
        setTimeout(() => {
          requestBotMove(newGame.fen());
        }, 2000);
      }
    }
  };

  const resetGame = () => {
    stopSpeaking();
    const newGame = new Chess();
    setGameState(prev => ({
      ...prev,
      gameStarted: false,
      playerName: '',
      playerGender: '',
      playerColor: 'white',
      game: newGame,
      gamePosition: newGame.fen(),
      moveHistory: [],
      gameStatus: 'Game in progress',
      isPlayerTurn: true,
      botThinking: false,
      lastMove: null,
      botMessage: '',
      showBotMessage: false,
      selectedSquares: [],
      moveCount: 0,
    }));
  };

  const showBotPersonality = (customMessage?: string) => {
    const isGentle = gameState.playerGender === 'female';
    const messages = isGentle ? femaleTrashTalk : maleTrashTalk;
    const message = customMessage || messages[Math.floor(Math.random() * messages.length)];
    
    setGameState(prev => ({
      ...prev,
      botMessage: message,
      showBotMessage: true,
    }));

    // Speak the message if speech is enabled
    if (gameState.speechEnabled) {
      speakTrashTalk(message, isGentle);
    }

    setTimeout(() => {
      setGameState(prev => ({ ...prev, showBotMessage: false }));
    }, 4000);
  };

  const requestBotMove = (fen: string) => {
    setGameState(prev => ({ ...prev, botThinking: true }));
    
    requestMove(
      fen,
      (move: string) => {
        makeBotMove(move);
      },
      () => {
        console.error('Bot move failed');
        setGameState(prev => ({ ...prev, botThinking: false }));
      }
    );
  };

  const makeBotMove = (moveString: string) => {
    setGameState(prev => {
      const newGame = new Chess(prev.gamePosition);
      
      try {
        const move = newGame.move({
          from: moveString.slice(0, 2),
          to: moveString.slice(2, 4),
          promotion: moveString.slice(4) || undefined,
        });

        if (move) {
          const newMoveHistory = [...prev.moveHistory, move.san];
          const newMoveCount = prev.moveCount + 1;
          let status = 'Game in progress';
          
          if (newGame.isCheckmate()) {
            status = `Checkmate! ${newGame.turn() === 'w' ? 'Black' : 'White'} wins!`;
          } else if (newGame.isDraw()) {
            status = 'Draw!';
          } else if (newGame.isCheck()) {
            status = 'Check!';
          }

          // Play move sound
          if (prev.soundEnabled) {
            setTimeout(() => playMoveSound(), 100);
          }

          // Show bot personality message after move (every 2-3 moves)
          if (newMoveCount % (Math.random() > 0.5 ? 2 : 3) === 0) {
            setTimeout(() => {
              showBotPersonality();
            }, 800);
          }

          return {
            ...prev,
            game: newGame,
            gamePosition: newGame.fen(),
            moveHistory: newMoveHistory,
            gameStatus: status,
            isPlayerTurn: true,
            botThinking: false,
            lastMove: { from: move.from, to: move.to },
            selectedSquares: [],
            moveCount: newMoveCount,
          };
        }
      } catch (error) {
        console.error('Invalid bot move:', error);
      }

      return { ...prev, botThinking: false };
    });
  };

  const onDrop = (sourceSquare: string, targetSquare: string, piece: string) => {
    if (!gameState.isPlayerTurn || gameState.botThinking) {
      return false;
    }

    const newGame = new Chess(gameState.gamePosition);
    
    try {
      const move = newGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece.toLowerCase().includes('q') ? 'q' : undefined,
      });

      if (move) {
        const newMoveHistory = [...gameState.moveHistory, move.san];
        const newMoveCount = gameState.moveCount + 1;
        let status = 'Game in progress';
        
        if (newGame.isCheckmate()) {
          status = `Checkmate! ${newGame.turn() === 'w' ? 'Black' : 'White'} wins!`;
        } else if (newGame.isDraw()) {
          status = 'Draw!';
        } else if (newGame.isCheck()) {
          status = 'Check!';
        }

        setGameState(prev => ({
          ...prev,
          game: newGame,
          gamePosition: newGame.fen(),
          moveHistory: newMoveHistory,
          gameStatus: status,
          isPlayerTurn: false,
          lastMove: { from: move.from, to: move.to },
          selectedSquares: [],
          moveCount: newMoveCount,
        }));

        // Play move sound
        if (gameState.soundEnabled) {
          playMoveSound();
        }

        // Request bot move with minimal delay for Chess.com-like speed
        if (!newGame.isGameOver()) {
          setTimeout(() => {
            requestBotMove(newGame.fen());
          }, 200);
        }

        return true;
      }
    } catch (error) {
      return false;
    }

    return false;
  };

  const onPieceDragBegin = (piece: string, sourceSquare: string) => {
    const isPlayerPiece = gameState.playerColor === 'white' 
      ? piece.search(/^w/) !== -1 
      : piece.search(/^b/) !== -1;
    
    return gameState.isPlayerTurn && !gameState.botThinking && isPlayerPiece;
  };

  const onSquareClick = (square: string) => {
    if (!gameState.isPlayerTurn || gameState.botThinking) return;

    const game = new Chess(gameState.gamePosition);
    const piece = game.get(square);
    
    if (piece && 
        ((gameState.playerColor === 'white' && piece.color === 'w') ||
         (gameState.playerColor === 'black' && piece.color === 'b'))) {
      
      const moves = game.moves({ square, verbose: true });
      const targetSquares = moves.map(move => move.to);
      
      setGameState(prev => ({
        ...prev,
        selectedSquares: [square, ...targetSquares],
      }));
    } else if (gameState.selectedSquares.length > 0) {
      const sourceSquare = gameState.selectedSquares[0];
      if (gameState.selectedSquares.includes(square)) {
        onDrop(sourceSquare, square, '');
      } else {
        setGameState(prev => ({ ...prev, selectedSquares: [] }));
      }
    }
  };

  const toggleFullscreen = () => {
    setGameState(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }));
  };

  const toggleSound = () => {
    setGameState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const toggleSpeech = () => {
    setGameState(prev => {
      const newSpeechEnabled = !prev.speechEnabled;
      if (!newSpeechEnabled) {
        stopSpeaking();
      }
      return { ...prev, speechEnabled: newSpeechEnabled };
    });
  };

  const boardOrientation = gameState.playerColor;

  const customSquareStyles = {
    ...(gameState.lastMove && {
      [gameState.lastMove.from]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
      [gameState.lastMove.to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
    }),
    ...(gameState.selectedSquares.length > 0 && {
      [gameState.selectedSquares[0]]: { backgroundColor: 'rgba(0, 255, 0, 0.4)' },
      ...gameState.selectedSquares.slice(1).reduce((acc, square) => ({
        ...acc,
        [square]: { backgroundColor: 'rgba(0, 255, 0, 0.2)', border: '2px solid rgba(0, 255, 0, 0.6)' }
      }), {})
    })
  };

  const getBoardSize = () => {
    if (typeof window === 'undefined') return 400;
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    if (gameState.isFullscreen) {
      return Math.min(screenWidth * 0.8, screenHeight * 0.8, 600);
    }
    
    if (screenWidth < 640) {
      return Math.min(screenWidth - 32, 350);
    } else if (screenWidth < 1024) {
      return 400;
    } else {
      return 500;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm ${
            gameState.isFullscreen ? 'p-0' : 'p-2 sm:p-4'
          }`}
          onClick={!gameState.isFullscreen ? onClose : undefined}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`bg-dark-800 rounded-xl border border-dark-700 w-full max-w-7xl ${
              gameState.isFullscreen 
                ? 'h-full rounded-none max-w-none' 
                : 'max-h-[95vh] overflow-y-auto'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-6 border-b border-dark-700">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
                <h2 className="text-lg sm:text-2xl font-bold font-poppins truncate">Chess vs Eusha</h2>
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-red-600/20 rounded-full border border-red-500/30">
                  <Zap className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-400 font-medium">Stockfish 16 • {engineStrength} ELO</span>
                </div>
                {gameState.gameStarted && (
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                    <Clock size={14} />
                    <span className="hidden sm:inline">
                      {gameState.botThinking ? `Calculating... (D${analysisDepth})` : gameState.isPlayerTurn ? "Your turn" : "Eusha's turn"}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {gameState.gameStarted && (
                  <>
                    <button
                      onClick={toggleSound}
                      className={`p-2 transition-colors ${
                        gameState.soundEnabled ? 'text-green-400' : 'text-gray-400'
                      } hover:text-white`}
                      title={gameState.soundEnabled ? 'Disable sounds' : 'Enable sounds'}
                    >
                      {gameState.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                    </button>
                    <button
                      onClick={toggleSpeech}
                      className={`p-2 transition-colors ${
                        gameState.speechEnabled ? 'text-blue-400' : 'text-gray-400'
                      } hover:text-white`}
                      title={gameState.speechEnabled ? 'Disable trash talk' : 'Enable trash talk'}
                    >
                      <MessageCircle size={18} />
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      data-cursor="pointer"
                    >
                      {gameState.isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                    </button>
                  </>
                )}
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  data-cursor="pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-6">
              {!gameState.gameStarted ? (
                <div className="text-center space-y-4 sm:space-y-6 max-w-md mx-auto">
                  <div className="bg-dark-700/50 rounded-xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-4">Challenge Eusha!</h3>
                    <p className="text-gray-400 mb-6 text-sm sm:text-base">
                      Face off against Stockfish 16 WASM engine running at {engineStrength} ELO. Choose your details and prepare for battle!
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={gameState.playerName}
                          onChange={(e) => setGameState(prev => ({ ...prev, playerName: e.target.value }))}
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                          placeholder="Enter your name"
                          onKeyPress={(e) => e.key === 'Enter' && gameState.playerGender && startGame()}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Gender (for personalized experience)
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <motion.button
                            onClick={() => setGameState(prev => ({ ...prev, playerGender: 'male' }))}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                              gameState.playerGender === 'male'
                                ? 'border-blue-500 bg-blue-500/20'
                                : 'border-dark-600 bg-dark-700'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-xl sm:text-2xl mb-2">👨</div>
                              <div className="font-medium text-sm sm:text-base">Male</div>
                              <div className="text-xs sm:text-sm text-gray-400">Aggressive mode</div>
                            </div>
                          </motion.button>
                          
                          <motion.button
                            onClick={() => setGameState(prev => ({ ...prev, playerGender: 'female' }))}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                              gameState.playerGender === 'female'
                                ? 'border-pink-500 bg-pink-500/20'
                                : 'border-dark-600 bg-dark-700'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-xl sm:text-2xl mb-2">👩</div>
                              <div className="font-medium text-sm sm:text-base">Female</div>
                              <div className="text-xs sm:text-sm text-gray-400">Gentle mode</div>
                            </div>
                          </motion.button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Choose Your Color
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <motion.button
                            onClick={() => setGameState(prev => ({ ...prev, playerColor: 'white' }))}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                              gameState.playerColor === 'white'
                                ? 'border-primary-500 bg-primary-500/20'
                                : 'border-dark-600 bg-dark-700'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-xl sm:text-2xl mb-2">♔</div>
                              <div className="font-medium text-sm sm:text-base">White</div>
                              <div className="text-xs sm:text-sm text-gray-400">You go first</div>
                            </div>
                          </motion.button>
                          
                          <motion.button
                            onClick={() => setGameState(prev => ({ ...prev, playerColor: 'black' }))}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                              gameState.playerColor === 'black'
                                ? 'border-primary-500 bg-primary-500/20'
                                : 'border-dark-600 bg-dark-700'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-xl sm:text-2xl mb-2">♚</div>
                              <div className="font-medium text-sm sm:text-base">Black</div>
                              <div className="text-xs sm:text-sm text-gray-400">Eusha goes first</div>
                            </div>
                          </motion.button>
                        </div>
                      </div>

                      <motion.button
                        onClick={startGame}
                        disabled={!gameState.playerName.trim() || !gameState.playerGender || !isReady}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 sm:px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold text-white transition-all duration-200 text-sm sm:text-base"
                      >
                        {!isReady ? 'Loading Stockfish 16...' : 'Start Battle!'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`grid gap-4 sm:gap-6 ${gameState.isFullscreen ? 'grid-cols-1 lg:grid-cols-4 h-[calc(100vh-120px)]' : 'grid-cols-1 lg:grid-cols-4'}`}>
                  {/* Game Info Panel */}
                  <div className="lg:col-span-1 space-y-3 sm:space-y-4 order-2 lg:order-1">
                    {/* Players */}
                    <div className="space-y-3">
                      {/* Top Player */}
                      {gameState.playerColor === 'white' ? (
                        <div className={`bg-dark-700/50 rounded-xl p-3 sm:p-4 transition-all ${
                          !gameState.isPlayerTurn && !gameState.botThinking ? 'ring-2 ring-red-500' : 
                          gameState.botThinking ? 'ring-2 ring-yellow-500' : ''
                        }`}>
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-primary-500 flex-shrink-0">
                              <img 
                                src="/481281109_1096804492202639_400819024598160651_n.jpg" 
                                alt="Eusha" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-sm sm:text-base truncate">Eusha (Stockfish 16)</h4>
                              <p className="text-xs sm:text-sm text-gray-400">Rating: {engineStrength}</p>
                            </div>
                          </div>
                          <div className="text-xs sm:text-sm text-gray-400">
                            Playing as: Black ♛
                          </div>
                          {gameState.botThinking && (
                            <div className="text-xs sm:text-sm text-yellow-400 mt-1 flex items-center space-x-1">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                              <span>Calculating... (Depth {analysisDepth})</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className={`bg-dark-700/50 rounded-xl p-3 sm:p-4 transition-all ${
                          gameState.isPlayerTurn ? 'ring-2 ring-green-500' : ''
                        }`}>
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-lg font-bold">{gameState.playerGender === 'female' ? '👩' : '👨'}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-sm sm:text-base truncate">{gameState.playerName}</h4>
                              <p className="text-xs sm:text-sm text-gray-400">You</p>
                            </div>
                          </div>
                          <div className="text-xs sm:text-sm text-gray-400">
                            Playing as: Black ♛
                          </div>
                          {gameState.isPlayerTurn && (
                            <div className="text-xs sm:text-sm text-green-400 mt-1 flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span>Your turn</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Bottom Player */}
                      {gameState.playerColor === 'white' ? (
                        <div className={`bg-dark-700/50 rounded-xl p-3 sm:p-4 transition-all ${
                          gameState.isPlayerTurn ? 'ring-2 ring-green-500' : ''
                        }`}>
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-lg font-bold">{gameState.playerGender === 'female' ? '👩' : '👨'}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-sm sm:text-base truncate">{gameState.playerName}</h4>
                              <p className="text-xs sm:text-sm text-gray-400">You</p>
                            </div>
                          </div>
                          <div className="text-xs sm:text-sm text-gray-400">
                            Playing as: White ♔
                          </div>
                          {gameState.isPlayerTurn && (
                            <div className="text-xs sm:text-sm text-green-400 mt-1 flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span>Your turn</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className={`bg-dark-700/50 rounded-xl p-3 sm:p-4 transition-all ${
                          !gameState.isPlayerTurn && !gameState.botThinking ? 'ring-2 ring-red-500' : 
                          gameState.botThinking ? 'ring-2 ring-yellow-500' : ''
                        }`}>
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-primary-500 flex-shrink-0">
                              <img 
                                src="/481281109_1096804492202639_400819024598160651_n.jpg" 
                                alt="Eusha" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-sm sm:text-base truncate">Eusha (Stockfish 16)</h4>
                              <p className="text-xs sm:text-sm text-gray-400">Rating: {engineStrength}</p>
                            </div>
                          </div>
                          <div className="text-xs sm:text-sm text-gray-400">
                            Playing as: White ♔
                          </div>
                          {gameState.botThinking && (
                            <div className="text-xs sm:text-sm text-yellow-400 mt-1 flex items-center space-x-1">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                              <span>Calculating... (Depth {analysisDepth})</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bot Message */}
                    <AnimatePresence>
                      {gameState.showBotMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.9 }}
                          className={`rounded-xl p-3 sm:p-4 border ${
                            gameState.playerGender === 'female' 
                              ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/30'
                              : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30'
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            <MessageCircle className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 ${
                              gameState.playerGender === 'female' ? 'text-pink-400' : 'text-red-400'
                            }`} />
                            <div className="min-w-0 flex-1">
                              <p className={`text-xs sm:text-sm font-medium mb-1 ${
                                gameState.playerGender === 'female' ? 'text-pink-400' : 'text-red-400'
                              }`}>
                                Eusha says:
                              </p>
                              <p className="text-xs sm:text-sm text-white italic break-words">"{gameState.botMessage}"</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Game Status */}
                    <div className="bg-dark-700/50 rounded-xl p-3 sm:p-4">
                      <h4 className="font-bold mb-2 text-sm sm:text-base">Game Status</h4>
                      <p className="text-xs sm:text-sm text-gray-400">{gameState.gameStatus}</p>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Moves: {Math.ceil(gameState.moveHistory.length / 2)}
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        Engine: Stockfish 16 WASM • {engineStrength} ELO • 150ms movetime
                      </div>
                    </div>

                    {/* Move History */}
                    <div className="bg-dark-700/50 rounded-xl p-3 sm:p-4">
                      <h4 className="font-bold mb-2 text-sm sm:text-base">Move History</h4>
                      <div className="max-h-24 sm:max-h-32 overflow-y-auto text-xs sm:text-sm">
                        {gameState.moveHistory.length === 0 ? (
                          <p className="text-gray-400">No moves yet</p>
                        ) : (
                          <div className="space-y-1">
                            {gameState.moveHistory.map((move, index) => (
                              <div key={index} className="flex">
                                <span className="text-gray-400 w-6 sm:w-8 flex-shrink-0">
                                  {index % 2 === 0 ? `${Math.ceil((index + 1) / 2)}.` : ''}
                                </span>
                                <span className="text-white break-all">{move}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Controls */}
                    <motion.button
                      onClick={resetGame}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
                    >
                      <RotateCcw size={14} />
                      <span>New Game</span>
                    </motion.button>
                  </div>

                  {/* Chess Board */}
                  <div className="lg:col-span-3 order-1 lg:order-2">
                    <div className="bg-dark-700/50 rounded-xl p-2 sm:p-4">
                      <div className="w-full flex justify-center">
                        <div style={{ width: getBoardSize(), height: getBoardSize() }}>
                          <Chessboard
                            ref={boardRef}
                            position={gameState.gamePosition}
                            onPieceDrop={onDrop}
                            onPieceDragBegin={onPieceDragBegin}
                            onSquareClick={onSquareClick}
                            boardOrientation={boardOrientation}
                            customSquareStyles={customSquareStyles}
                            animationDuration={200}
                            arePiecesDraggable={gameState.isPlayerTurn && !gameState.botThinking}
                            boardWidth={getBoardSize()}
                            customBoardStyle={{
                              borderRadius: '8px',
                              boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                            }}
                            customDarkSquareStyle={{ backgroundColor: '#769656' }}
                            customLightSquareStyle={{ backgroundColor: '#eeeed2' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChessGame;