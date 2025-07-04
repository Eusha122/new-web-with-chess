import { useRef, useCallback, useEffect, useState } from 'react';

interface StockfishHook {
  requestMove: (fen: string, onMove: (move: string) => void, onError?: () => void) => void;
  isReady: boolean;
  terminate: () => void;
  engineStrength: number;
  analysisDepth: number;
}

export const useStockfish = (): StockfishHook => {
  const workerRef = useRef<Worker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [analysisDepth, setAnalysisDepth] = useState(0);
  const pendingCallbackRef = useRef<((move: string) => void) | null>(null);
  const errorCallbackRef = useRef<(() => void) | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initializeStockfish = async () => {
      try {
        const workerCode = `
          let stockfish = null;
          let isEngineReady = false;
          
          // Load Stockfish 16 WASM from CDN
          importScripts('https://unpkg.com/stockfish@16.0.0/src/stockfish.wasm.js');
          
          if (typeof Stockfish !== 'undefined') {
            stockfish = Stockfish();
            
            stockfish.onmessage = function(line) {
              console.log('🔥 SF16:', line);
              
              if (line.includes('readyok')) {
                isEngineReady = true;
                self.postMessage({ type: 'ready' });
              } else if (line.startsWith('bestmove')) {
                const parts = line.split(' ');
                const move = parts[1];
                if (move && move !== '(none)') {
                  self.postMessage({ type: 'bestmove', move: move });
                } else {
                  self.postMessage({ type: 'error', message: 'No valid move found' });
                }
              } else if (line.includes('info depth')) {
                // Forward depth info for UI
                const depthMatch = line.match(/depth (\\d+)/);
                const scoreMatch = line.match(/score cp (-?\\d+)/);
                const nodesMatch = line.match(/nodes (\\d+)/);
                const npsMatch = line.match(/nps (\\d+)/);
                
                if (depthMatch) {
                  self.postMessage({ 
                    type: 'analysis', 
                    depth: parseInt(depthMatch[1]),
                    score: scoreMatch ? parseInt(scoreMatch[1]) : null,
                    nodes: nodesMatch ? parseInt(nodesMatch[1]) : null,
                    nps: npsMatch ? parseInt(npsMatch[1]) : null
                  });
                }
              }
            };
            
            // Configure Stockfish 16 for MAXIMUM strength and Chess.com-like speed
            stockfish.postMessage('uci');
            stockfish.postMessage('setoption name Threads value 4');           // 4 threads for speed
            stockfish.postMessage('setoption name Hash value 128');            // 128MB hash table
            stockfish.postMessage('setoption name Skill Level value 20');      // MAXIMUM skill level
            stockfish.postMessage('setoption name UCI_LimitStrength value false'); // No strength limit
            stockfish.postMessage('setoption name UCI_Elo value 3000');        // 3000 ELO rating
            stockfish.postMessage('setoption name Move Overhead value 10');    // Minimal move overhead
            stockfish.postMessage('setoption name Contempt value 24');         // Aggressive, confident play
            stockfish.postMessage('setoption name Ponder value false');        // No pondering for speed
            stockfish.postMessage('setoption name MultiPV value 1');           // Single best line
            stockfish.postMessage('setoption name Minimum Thinking Time value 50'); // Minimum think time
            stockfish.postMessage('ucinewgame');
            stockfish.postMessage('isready');
            
            console.log('🚀 Stockfish 16 WASM configured for 3000+ ELO strength');
          } else {
            self.postMessage({ type: 'error', message: 'Failed to load Stockfish 16 WASM' });
          }
          
          self.onmessage = function(e) {
            const { command, fen } = e.data;
            
            if (!stockfish || !isEngineReady) {
              self.postMessage({ type: 'error', message: 'Engine not ready' });
              return;
            }
            
            if (command === 'position') {
              // Ultra-fast move calculation like Chess.com bots
              stockfish.postMessage('stop'); // Stop any ongoing search
              stockfish.postMessage(\`position fen \${fen}\`);
              
              // Use movetime 150ms for instant response like Chess.com
              stockfish.postMessage('go movetime 150');
              
              // Backup timeout at 300ms
              setTimeout(() => {
                stockfish.postMessage('stop');
                self.postMessage({ type: 'error', message: 'Move calculation timeout' });
              }, 300);
            } else if (command === 'stop') {
              stockfish.postMessage('stop');
            } else if (command === 'newgame') {
              stockfish.postMessage('ucinewgame');
              stockfish.postMessage('isready');
            }
          };
        `;

        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(blob);
        
        workerRef.current = new Worker(workerUrl);
        
        workerRef.current.onmessage = (event) => {
          const { type, move, message, depth, score, nodes, nps } = event.data;
          
          if (type === 'ready') {
            setIsReady(true);
            console.log('🔥 Stockfish 16 WASM ready - 3000 ELO beast mode activated!');
          } else if (type === 'bestmove') {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
            
            if (pendingCallbackRef.current) {
              pendingCallbackRef.current(move);
              pendingCallbackRef.current = null;
            }
          } else if (type === 'analysis') {
            setAnalysisDepth(depth || 0);
            if (depth && score !== null) {
              console.log(\`📊 Analysis: Depth \${depth}, Score: \${score/100} pawns, Nodes: \${nodes}, NPS: \${nps}\`);
            }
          } else if (type === 'error') {
            console.error('❌ Stockfish error:', message);
            
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
            
            if (errorCallbackRef.current) {
              errorCallbackRef.current();
              errorCallbackRef.current = null;
            }
          }
        };

        workerRef.current.onerror = (error) => {
          console.error('❌ Stockfish Worker error:', error);
          if (errorCallbackRef.current) {
            errorCallbackRef.current();
            errorCallbackRef.current = null;
          }
        };

      } catch (error) {
        console.error('❌ Failed to initialize Stockfish 16:', error);
      }
    };

    initializeStockfish();

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const requestMove = useCallback((fen: string, onMove: (move: string) => void, onError?: () => void) => {
    if (!workerRef.current || !isReady) {
      console.error('❌ Stockfish 16 not ready');
      onError?.();
      return;
    }

    pendingCallbackRef.current = onMove;
    errorCallbackRef.current = onError || null;

    // 200ms timeout for ultra-fast Chess.com-like response
    timeoutRef.current = setTimeout(() => {
      console.warn('⚠️ Move request timeout');
      if (errorCallbackRef.current) {
        errorCallbackRef.current();
        errorCallbackRef.current = null;
      }
      pendingCallbackRef.current = null;
    }, 200);

    workerRef.current.postMessage({
      command: 'position',
      fen: fen
    });
  }, [isReady]);

  const terminate = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    setIsReady(false);
  }, []);

  return {
    requestMove,
    isReady,
    terminate,
    engineStrength: 3000,
    analysisDepth
  };
};