import { Move } from "../types"

type CharacterProps = {
    name: string,
    baseHealth: number,
    currentHealth: number
    moves: Move[]
    attackCallback: (move: Move) => void,
    disabledButtons: boolean
}

const Character = (props: CharacterProps) => {

    return (
        <div>
            <h3>{props.name} | health: {props.currentHealth} / {props.baseHealth}</h3>
            <div>Moves:
                {
                    props.moves.map(move => (<button key={move.name} disabled={props.disabledButtons} onClick={() => props.attackCallback(move)}> {move.name}</button>))
                }
            </div>
        </div>
    )
}

export default Character