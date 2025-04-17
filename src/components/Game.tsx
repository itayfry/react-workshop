import Header from './Header'
import { Move } from '../types'
import Character from './Character'
import { useEffect, useState } from 'react'

const Game = () => {
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/pikachu').then(respone => respone.json()).then(data => console.log(data))
    }, [])
    const [playerPokemonHealth, setPlayerPokemonHealth] = useState(100)
    const [oponentPokemonHealth, setOponnentPokemonHealth] = useState(140)
    const [winner, setWinner] = useState<string | undefined>();

    useEffect(() => {
        if (playerPokemonHealth <= 0){
            setWinner('Ekans')
        }
        else if (oponentPokemonHealth <=0){
            setWinner('Pikachu')
        }
    }, [playerPokemonHealth, oponentPokemonHealth])
    const didAttackLand = (move: Move) => (move.accuracy >= (Math.random() * 100))
    const onPlayerAttackClicked = (move: Move) => didAttackLand(move) && setOponnentPokemonHealth(prev => Math.max(prev - move.power, 0))
    const onOpenentAttackClicked = (move: Move) => didAttackLand(move) && setPlayerPokemonHealth(prev => Math.max(prev - move.power, 0))

    return (
        <div data-testid={'game'}>
            <Header winner={winner}/>

            <Character
                name="Pikachu"
                baseHealth={100}
                currentHealth={playerPokemonHealth}
                moves={[
                    {name:'Thunderbolt', power: 12, accuracy: 85},
                    {name:'Bolt', power: 8, accuracy: 95},
                ]}
                attackCallback={(move) => onPlayerAttackClicked(move)}
                disabledButtons={!!winner}
                />
            <div style={{ height: '200px' }}></div>
            <Character
                name="Ekans"
                baseHealth={140}
                currentHealth={oponentPokemonHealth}
                moves={[
                    {name:'Bite', power: 8, accuracy: 90},
                    {name:'Tackle', power: 7, accuracy: 95},
                ]}
                attackCallback={(move) => onOpenentAttackClicked(move)}
                disabledButtons={!!winner}
            />
        </div>

    )
}

export default Game