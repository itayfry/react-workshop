type BattleLogProps = {
    messages: string[]
}

const BattleLog = (props: BattleLogProps) => {
    return (
        <div>
            {props.messages.map((message, index) =>
                <span key={index}>{message}</span>
            )}
        </div>
    )
}

export default BattleLog