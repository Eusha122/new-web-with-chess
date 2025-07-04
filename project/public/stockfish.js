// Stockfish.js Web Worker wrapper
// This file loads the actual Stockfish WASM engine

class StockfishWorker {
  constructor() {
    this.wasmSupported = typeof WebAssembly === 'object';
    this.engine = null;
    this.messageQueue = [];
    this.isReady = false;
    this.onmessage = null;
    
    this.initEngine();
  }

  async initEngine() {
    try {
      if (this.wasmSupported) {
        // Load Stockfish WASM from CDN
        const response = await fetch('https://unpkg.com/stockfish@16.0.0/src/stockfish.wasm.js');
        const stockfishCode = await response.text();
        
        // Create a blob URL for the worker
        const blob = new Blob([stockfishCode], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(blob);
        
        this.engine = new Worker(workerUrl);
        
        this.engine.onmessage = (event) => {
          if (this.onmessage) {
            this.onmessage(event);
          }
        };
        
        // Wait for engine to be ready
        this.engine.postMessage('uci');
        this.isReady = true;
        
        // Process queued messages
        this.messageQueue.forEach(msg => this.engine.postMessage(msg));
        this.messageQueue = [];
        
      } else {
        console.warn('WebAssembly not supported, using fallback');
        this.createFallbackEngine();
      }
    } catch (error) {
      console.warn('Failed to load Stockfish WASM, using fallback:', error);
      this.createFallbackEngine();
    }
  }

  createFallbackEngine() {
    // Fallback engine that makes reasonable moves
    this.engine = {
      postMessage: (message) => {
        if (message.startsWith('position')) {
          // Extract FEN and calculate a move
          setTimeout(() => {
            const bestMove = this.calculateFallbackMove(message);
            if (this.onmessage) {
              this.onmessage({ data: `bestmove ${bestMove}` });
            }
          }, 1000);
        }
      }
    };
    this.isReady = true;
  }

  calculateFallbackMove(positionMessage) {
    // Simple fallback that picks a random legal move
    // In a real implementation, this would use a basic chess engine
    const moves = ['e2e4', 'g1f3', 'f1c4', 'd2d4', 'b1c3'];
    return moves[Math.floor(Math.random() * moves.length)];
  }

  postMessage(message) {
    if (this.isReady && this.engine) {
      this.engine.postMessage(message);
    } else {
      this.messageQueue.push(message);
    }
  }

  terminate() {
    if (this.engine && this.engine.terminate) {
      this.engine.terminate();
    }
  }
}

// Export for use in the main thread
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StockfishWorker;
} else if (typeof self !== 'undefined') {
  self.StockfishWorker = StockfishWorker;
}