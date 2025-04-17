import Logo from "./Logo"
import styles from "./Header.module.css"

type HeaderProps = {
    winner?: string
}

const Header = (props: HeaderProps) => {
    return (
        <div>
            <div className={styles.header}>
                <Logo />
                <h1>My Amazing Game</h1>
                <Logo />
            </div>
            {props.winner && <h2>Congrats to - {props.winner}!!</h2>}
        </div>
    )
}

export default Header