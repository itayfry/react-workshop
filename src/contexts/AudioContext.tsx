import React, { createContext, useContext, useState, ReactNode } from 'react';

type AudioContextType = {
  soundEnabled: boolean;
  toggleSoundEnabled: () => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

type AudioProviderProps = {
  children: ReactNode;
};

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSoundEnabled = () => setSoundEnabled(prev => !prev)

  return (
    <AudioContext.Provider value={{ soundEnabled, toggleSoundEnabled }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
