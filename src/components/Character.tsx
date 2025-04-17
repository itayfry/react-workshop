type CharacterProps = {
    name: string,
    baseHealth: number,
    moveName: string,
}


const Character = (props: CharacterProps) => {
    
    return (
        <div>
            <h2>{props.name} | health: {props.baseHealth} / {props.baseHealth}</h2>
            <div>Moves: <button>{props.moveName}</button></div>
        </div>
    )
}

export default Character