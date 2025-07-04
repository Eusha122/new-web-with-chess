import { useRef, useCallback, useEffect } from 'react';

interface StockfishHook {
  requestMove: (fen: string, onMove: (move: string) => void, onError?: () => void) => void;
  isReady: boolean;
  terminate: () => void;
}

export const useStockfish = (): StockfishHook => {
  const workerRef = useRef<Worker | null>(null);
  const isReadyRef = useRef(false);
  const pendingCallbackRef = useRef<((move: string) => void) | null>(null);
  const errorCallbackRef = useRef<(() => void) | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize Stockfish Web Worker
    const initializeStockfish = async () => {
      try {
        // Create optimized Stockfish worker with maximum strength
        const workerCode = `
          let stockfish = null;
          let isEngineReady = false;
          
          // Load Stockfish from CDN (Stockfish 16 WASM)
          importScripts('https://unpkg.com/stockfish@16.0.0/src/stockfish.js');
          
          if (typeof Stockfish !== 'undefined') {
            stockfish = Stockfish();
            
            stockfish.onmessage = function(line) {
              console.log('Stockfish output:', line);
              
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
              } else if (line.includes('info')) {
                // Optional: forward engine analysis info
                self.postMessage({ type: 'info', data: line });
              }
            };
            
            // Initialize engine with maximum strength settings
            stockfish.postMessage('uci');
            stockfish.postMessage('setoption name Threads value 1');        // Single thread for consistency
            stockfish.postMessage('setoption name Hash value 256');         // Adequate hash size
            stockfish.postMessage('setoption name Contempt value 0');       // Neutral contempt
            stockfish.postMessage('setoption name Move Overhead value 50'); // Minimal overhead
            stockfish.postMessage('setoption name Skill Level value 20');   // MAXIMUM SKILL LEVEL
            stockfish.postMessage('setoption name UCI_LimitStrength value false'); // No strength limit
            stockfish.postMessage('ucinewgame');
            stockfish.postMessage('isready');
          } else {
            self.postMessage({ type: 'error', message: 'Failed to load Stockfish' });
          }
          
          self.onmessage = function(e) {
            const { command, fen } = e.data;
            
            if (!stockfish || !isEngineReady) {
              self.postMessage({ type: 'error', message: 'Engine not ready' });
              return;
            }
            
            if (command === 'position') {
              // Set position and request best move with high depth
              stockfish.postMessage('stop'); // Stop any ongoing search
              stockfish.postMessage(\`position fen \${fen}\`);
              
              // Use depth 20 for maximum strength (3000+ ELO)
              // Alternative: use movetime for faster response
              stockfish.postMessage('go depth 20');
              
              // Backup timeout in case engine hangs
              setTimeout(() => {
                stockfish.postMessage('stop');
                self.postMessage({ type: 'error', message: 'Search timeout' });
              }, 10000); // 10 second maximum
            } else if (command === 'stop') {
              stockfish.postMessage('stop');
            }
          };
        `;

        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(blob);
        
        workerRef.current = new Worker(workerUrl);
        
        workerRef.current.onmessage = (event) => {
          const { type, move, message } = event.data;
          
          if (type === 'ready') {
            isReadyRef.current = true;
            console.log('Stockfish engine ready at maximum strength');
          } else if (type === 'bestmove') {
            // Clear timeout
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
            
            // Execute callback with best move
            if (pendingCallbackRef.current) {
              pendingCallbackRef.current(move);
              pendingCallbackRef.current = null;
            }
          } else if (type === 'error') {
            console.error('Stockfish error:', message);
            
            // Clear timeout
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
            
            // Execute error callback
            if (errorCallbackRef.current) {
              errorCallbackRef.current();
              errorCallbackRef.current = null;
            }
          } else if (type === 'info') {
            // Optional: handle engine analysis info
            console.log('Engine info:', event.data.data);
          }
        };

        workerRef.current.onerror = (error) => {
          console.error('Worker error:', error);
          if (errorCallbackRef.current) {
            errorCallbackRef.current();
            errorCallbackRef.current = null;
          }
        };

      } catch (error) {
        console.error('Failed to initialize Stockfish:', error);
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
    if (!workerRef.current || !isReadyRef.current) {
      console.error('Stockfish not ready');
      onError?.();
      return;
    }

    // Store callbacks
    pendingCallbackRef.current = onMove;
    errorCallbackRef.current = onError || null;

    // Set timeout for move request (5 seconds max)
    timeoutRef.current = setTimeout(() => {
      console.warn('Move request timeout');
      if (errorCallbackRef.current) {
        errorCallbackRef.current();
        errorCallbackRef.current = null;
      }
      pendingCallbackRef.current = null;
    }, 5000);

    // Request move from engine
    workerRef.current.postMessage({
      command: 'position',
      fen: fen
    });
  }, []);

  const terminate = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    isReadyRef.current = false;
  }, []);

  return {
    requestMove,
    isReady: isReadyRef.current,
    terminate
  };
};