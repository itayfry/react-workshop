import Logo from "./Logo"

const Header = () => {
    return (
        <div style={{display: 'flex'}}>
            <Logo />
            <h1>My Amazing Game</h1>
            <Logo />
        </div>
    )
}

export default Header