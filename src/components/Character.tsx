import { Move } from "../types"
import styles from "./Character.module.css"

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
        <div className={styles.character}>
            <div className={styles.header}>{props.imgUrl && <img src={props.imgUrl}></img>}<h3 >{props.name} | health: {props.currentHp} / {props.baseHp}</h3></div>
            <div className={styles.moves}>Moves:
                {
                    props.moves.map(move => (<button key={move.name} disabled={props.disabledButtons} onClick={() => props.attackCallback(move)}> {move.name}</button>))
                }
            </div>
        </div>
    )
}

export default Character