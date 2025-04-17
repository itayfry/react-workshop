import { useState } from "react"
import { PokemonResult } from "../types"

type PokemonSelectorProps = {
    availablePokemon: Array<{
        name: string,
        url: string,
    }>,
    setPlayerPokemon: (pokemon: PokemonResult) => void
    setOpponentPokemon: (pokemon: PokemonResult) => void
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
        }
    }

    return (
        <div>
            Props selector
            {props.availablePokemon.map(option =>
            (
                <button
                    key={option.name}
                    disabled={selections.length >= 2 || selections.includes(option.name)}
                    onClick={() => onSelectionClick(option)}>
                    {option.name}
                </button>)
            )}
        </div>
    )
}

export default PokemonSelector