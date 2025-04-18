import styles from "./BattleLog.module.css"

type BattleLogProps = {
    messages: string[]
}

const BattleLog = (props: BattleLogProps) => {
    return (
        <div className={styles.battleLog}>
            <h3>BattleLog</h3>
            {!!props.messages.length && <div className={styles.messages}>{props.messages.map((message, index) =>
                <span key={index} className={styles.message}>{message}</span>
            )}
            </div>}
        </div>
    )
}

export default BattleLog