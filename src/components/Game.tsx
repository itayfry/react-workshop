import Header from './Header'
import Character from './Character'
import { useEffect } from 'react'

const Game = () => {
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/pikachu').then(respone => respone.json()).then(data => console.log(data))
    }, [])
    return (
        <div data-testid={'game'}>
            <Header />
            
            <Character name="Pikachu"  baseHealth={100} moveName='Thunderbolt'/>
            <div style={{height: '200px'}}></div>
            <Character name="Ekans" baseHealth={140} moveName='Bite'/>
        </div>

    )
}

export default Game