import { useAudio } from '../contexts/AudioContext';
import styles from './ToggleSoundButton.module.css'

const ToggleSoundButton = () => {
  const { soundEnabled, toggleSoundEnabled } = useAudio();

  return (
    <span className={styles.sound_button} onClick={() => toggleSoundEnabled()}>
      {soundEnabled ? '🔊 On' : '🔇 Off'}
    </span>
  );
};

export default ToggleSoundButton