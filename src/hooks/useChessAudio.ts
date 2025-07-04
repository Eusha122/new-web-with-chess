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
      // Use Chess.com move sound
      if (!audioRef.current) {
        audioRef.current = new Audio('https://www.chess.com/bundles/web/sounds/move-self.mp3');
        audioRef.current.volume = 0.6;
      }
      
      // Reset and play
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.warn('Could not play move sound:', error);
      });
    } catch (error) {
      console.warn('Audio not supported:', error);
    }
  }, []);

  const speakTrashTalk = useCallback((message: string, isGentle: boolean = false) => {
    try {
      // Stop any ongoing speech
      if (speechRef.current) {
        speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(message);
      
      // Configure voice based on gender preference
      const voices = speechSynthesis.getVoices();
      
      if (isGentle) {
        // Sweet, calm voice for female players
        const femaleVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('karen') ||
          voice.name.toLowerCase().includes('victoria')
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
          voice.name.toLowerCase().includes('david')
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
      
    } catch (error) {
      console.warn('Speech synthesis not supported:', error);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    try {
      speechSynthesis.cancel();
      speechRef.current = null;
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