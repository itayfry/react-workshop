import styles from "./Logo.module.css";

const Logo = () => {
    const handlePlayAudio = () => {
        const a = new Audio('https://dw.zobj.net/download/v1/bG4W3t0J3Kg8VEExwXcGzp0xQY7RUK8VWVoIg50ZeAZ59KkSiTRsb-RKLGhL5QNNkGu4fLk3t-XzOZ8ZpQGoDE3A8qYtz2Ap5jOJGeD0UyLZ3L5NTyLoBSh9-P8o/?a=&c=72&f=pikachu_cute.mp3&special=1744982772-HsVu%2BIm5SHds7ItsOoI23Mxj2BS9xq1Dr1lrDrcViDM%3D')
        a.play();
        setTimeout(() => a.pause(), 2000) 
    }
    return (
        <div onClick={() => handlePlayAudio()} className={styles.logo}>
            <img src={"https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png"} className="logo" alt="Vite logo" />
        </div>
    )
}

export default Logo