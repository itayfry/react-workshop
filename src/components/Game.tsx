import Header from './Header'
import Character from './Character'
import { useEffect, useState } from 'react'

const Game = () => {
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/pikachu').then(respone => respone.json()).then(data => console.log(data))
    }, [])
    const [playerPokemonHealth, setPlayerPokemonHealth] = useState(100)
    const [oponentPokemonHealth, setOponnentPokemonHealth] = useState(140)

    return (
        <div data-testid={'game'}>
            <Header />

            <Character
                name="Pikachu"
                baseHealth={100}
                currentHealth={playerPokemonHealth}
                move={{name:'Thunderbolt', power: 12}}
                attackCallback={(movePower) => setOponnentPokemonHealth(prev => Math.max(prev - movePower))}
                />
            <div style={{ height: '200px' }}></div>
            <Character
                name="Ekans"
                baseHealth={140}
                currentHealth={oponentPokemonHealth}
                move={{name:'Bite', power: 8}}
                attackCallback={(movePower) => setPlayerPokemonHealth(prev => Math.max(prev - movePower))}
            />
        </div>

    )
}

export default Game