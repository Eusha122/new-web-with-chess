import { useCallback, useRef } from 'react';

interface ChessAudioHook {
  playMoveSound: () => void;
  speakTrashTalk: (message: string, isGentle?: boolean) => void;
  stopSpeaking: () => void;
}

export const useChessAudio = (): ChessAudioHook => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const playMoveSound = useCallback(() => {
    try {
      // Create a simple beep sound if Chess.com sound fails
      if (!audioRef.current) {
        // Try Chess.com sound first
        audioRef.current = new Audio();
        audioRef.current.volume = 0.6;
        
        // Fallback to data URL beep sound
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        
        return;
      }
      
      // Try to load and play Chess.com sound
      audioRef.current.src = 'https://www.chess.com/bundles/web/sounds/move-self.mp3';
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Fallback to beep if Chess.com sound fails
        console.log('Using fallback beep sound');
      });
    } catch (error) {
      console.warn('Audio not supported:', error);
    }
  }, []);

  const speakTrashTalk = useCallback((message: string, isGentle: boolean = false) => {
    try {
      // Check if speech synthesis is supported
      if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported');
        return;
      }

      // Stop any ongoing speech
      if (speechRef.current) {
        speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(message);
      
      // Wait for voices to load
      const setVoiceAndSpeak = () => {
        const voices = speechSynthesis.getVoices();
        
        if (isGentle) {
          // Sweet, calm voice for female players
          const femaleVoice = voices.find(voice => 
            voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('woman') ||
            voice.name.toLowerCase().includes('samantha') ||
            voice.name.toLowerCase().includes('karen') ||
            voice.name.toLowerCase().includes('victoria') ||
            voice.name.toLowerCase().includes('zira') ||
            (voice.lang.includes('en') && voice.name.toLowerCase().includes('f'))
          );
          
          if (femaleVoice) {
            utterance.voice = femaleVoice;
          }
          
          utterance.rate = 0.9;
          utterance.pitch = 1.1;
          utterance.volume = 0.7;
        } else {
          // Aggressive, confident male voice for male players
          const maleVoice = voices.find(voice => 
            voice.name.toLowerCase().includes('male') ||
            voice.name.toLowerCase().includes('man') ||
            voice.name.toLowerCase().includes('daniel') ||
            voice.name.toLowerCase().includes('alex') ||
            voice.name.toLowerCase().includes('fred') ||
            voice.name.toLowerCase().includes('david') ||
            voice.name.toLowerCase().includes('mark') ||
            (voice.lang.includes('en') && voice.name.toLowerCase().includes('m'))
          );
          
          if (maleVoice) {
            utterance.voice = maleVoice;
          }
          
          utterance.rate = 1.1;
          utterance.pitch = 0.8;
          utterance.volume = 0.9;
        }

        speechRef.current = utterance;
        speechSynthesis.speak(utterance);
      };

      // Check if voices are already loaded
      if (speechSynthesis.getVoices().length > 0) {
        setVoiceAndSpeak();
      } else {
        // Wait for voices to load
        speechSynthesis.addEventListener('voiceschanged', setVoiceAndSpeak, { once: true });
      }
      
    } catch (error) {
      console.warn('Speech synthesis error:', error);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    try {
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        speechRef.current = null;
      }
    } catch (error) {
      console.warn('Could not stop speech:', error);
    }
  }, []);

  return {
    playMoveSound,
    speakTrashTalk,
    stopSpeaking
  };
};