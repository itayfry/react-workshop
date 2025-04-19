import { useAudio } from "../contexts/AudioContext";
import pikachuSoundUrl from './../assets/pikachu.mp3';
import styles from "./Logo.module.css";

const Logo = () => {
    const { soundEnabled } = useAudio()
    const handlePlayAudio = () => soundEnabled && (new Audio(pikachuSoundUrl)).play();
    return (
        <div onClick={() => handlePlayAudio()} className={styles.logo}>
            <img src={"https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png"} className="logo" alt="Vite logo" />
        </div>
    )
}

export default Logo