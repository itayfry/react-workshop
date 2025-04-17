import { Move } from "../types"

type CharacterProps = {
    name: string,
    baseHp: number,
    currentHp: number
    moves: Move[]
    attackCallback: (move: Move) => void,
    disabledButtons: boolean,
    imgUrl: string,
}

const Character = (props: CharacterProps) => {

    return (
        <div>
            {props.imgUrl && <img src={props.imgUrl}></img>}<h3>{props.name} | health: {props.currentHp} / {props.baseHp}</h3>
            <div>Moves:
                {
                    props.moves.map(move => (<button key={move.name} disabled={props.disabledButtons} onClick={() => props.attackCallback(move)}> {move.name}</button>))
                }
            </div>
        </div>
    )
}

export default Character