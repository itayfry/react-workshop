type CharacterProps = {
    name: string,
    baseHealth: number,
    currentHealth: number
    move: {
        name: string,
        power: number,
    }
    attackCallback: (movePower: number) => void
}


const Character = (props: CharacterProps) => {
    
    return (
        <div>
            <h2>{props.name} | health: {props.currentHealth} / {props.baseHealth}</h2>
            <div>Moves: <button onClick={() => props.attackCallback(props.move.power)}>{props.move.name}</button></div>
        </div>
    )
}

export default Character