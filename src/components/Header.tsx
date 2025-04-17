import Logo from "./Logo"

type HeaderProps = {
    winner?: string
}

const Header = (props: HeaderProps) => {
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <Logo />
                <h1>My Amazing Game</h1>
                <Logo />
            </div>
            {props.winner && <h2>Congrats to - {props.winner}!!</h2>}
        </div>
    )
}

export default Header