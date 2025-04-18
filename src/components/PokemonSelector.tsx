import { useState } from "react"
import { PokemonResult } from "../types"
import styles from "./PokemonSelector.module.css"

type PokemonSelectorProps = {
    availablePokemon: Array<{
        name: string,
        url: string,
    }>,
    setPlayerPokemon: (pokemon: PokemonResult) => void
    setOpponentPokemon: (pokemon: PokemonResult) => void
    selectionCompleteCallback: () => void
}

const PokemonSelector = (props: PokemonSelectorProps) => {

    const [selections, setSelections] = useState<Array<string>>([])
    const onSelectionClick = (option: PokemonResult) => {
        setSelections(prev => [...prev, option.name])
        if (selections.length === 0) {
            props.setPlayerPokemon(option)
        }
        else {
            props.setOpponentPokemon(option)
            props.selectionCompleteCallback()
        }
    }

    return selections.length < 2 ? (
        <div className={styles.container}>
            <div className={styles.title}>Player {selections.length + 1}:</div>
            {props.availablePokemon.map(option =>
            (
                <button
                    key={option.name}
                    disabled={selections.includes(option.name)}
                    onClick={() => onSelectionClick(option)}>
                    {option.name}
                </button>)
            )}
        </div>
    ) : <h2>Fight!</h2>
}

export default PokemonSelector