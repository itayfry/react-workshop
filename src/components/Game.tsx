import Header from './Header'
import { Move, PokemonResult, PokemonData } from '../types'
import Character from './Character'
import PokemonSelector from './PokemonSelector'
import BattleLog from './BattleLog'
import { useEffect, useState } from 'react'
import { WinnerModal } from './WinnerModal'

const defaultPokemonData = {
    name: 'Pokemon',
    baseHp: 100,
    currentHp: 100,
    imgUrl: '',
    moves: [],
}

const Game = () => {
    const [winner, setWinner] = useState<string | undefined>();
    const [availablePokemon, setAvailablePokemon] = useState([])
    const [playerSelection, setPlayerSelection] = useState<PokemonResult>()
    const [opponentSelection, setOpponentSelection] = useState<PokemonResult>()
    const [playerPokemon, setPlayerPokemon] = useState<PokemonData>({ ...defaultPokemonData })
    const [opponentPokemon, setOpponentPokemon] = useState<PokemonData>({ ...defaultPokemonData })
    const [battleLog, setBattleLog] = useState<Array<string>>([])
    const [activePlayer, setActivePlayer] = useState(0)

    const toggleActivePlayer = () => activePlayer === 1 ? setActivePlayer(2) : setActivePlayer(1)

    const didAttackLand = (move: Move) => (move.accuracy >= (Math.random() * 100))
    const onPlayerAttackClicked = (move: Move) => {
        let message;
        if (didAttackLand(move)) {
            setOpponentPokemon(prev => ({ ...prev, currentHp: Math.max(prev.currentHp - move.power, 0) }))
            message = `${playerPokemon.name} landed a ${move.name} on ${opponentPokemon.name}`
        }
        else {
            message = `${playerPokemon.name} missed with ${move.name}`
        }
        setBattleLog(prev => [...prev, message])
        toggleActivePlayer()
    }
    const onOpenentAttackClicked = (move: Move) => {
        let message;
        if (didAttackLand(move)) {
            message = `${opponentPokemon.name} landed a ${move.name} on ${playerPokemon.name}`
            setPlayerPokemon(prev => ({ ...prev, currentHp: Math.max(prev.currentHp - move.power, 0) }))
        }
        else {
            message = `${opponentPokemon.name} missed with ${move.name}`
        }
        setBattleLog(prev => [...prev, message])
        toggleActivePlayer()
    }

    const transformPokemonResult = async (pokemonResult: PokemonResult) => {
        const res: Partial<PokemonData> = {};
        await (fetch(pokemonResult.url)
            .then(response => response.json())
            .then(async data => {
                res.name = data.name
                res.baseHp = data.stats[0].base_stat
                res.currentHp = res.baseHp
                res.imgUrl = data.sprites.front_default
                res.moves = []
                for (const moveResult of data.moves.slice(0, 4)) {
                    await fetch(moveResult.move.url).then(res => res.json()).then(data => {
                        const name: string = data.names.filter((n: { language: { name: string } }) => n.language.name === 'en')[0].name
                        const { accuracy } = data
                        const power = Math.ceil(data.power / 4)
                        res.moves!.push({ name, power, accuracy })
                    })
                }
            })
        )
        return res as PokemonData

    }

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?offset=24')
            .then(respone => respone.json())
            .then(data => {
                setAvailablePokemon(data.results.filter((_: PokemonResult, i: number) => !(i % 2)))
            })
    }, [])


    useEffect(() => {
        if (playerPokemon.currentHp <= 0) {
            setWinner(opponentPokemon.name)
        }
        else if (opponentPokemon.currentHp <= 0) {
            setWinner(playerPokemon.name)
        }
    }, [playerPokemon, opponentPokemon])

    useEffect(() => {
        if (playerSelection?.url) {
            transformPokemonResult(playerSelection!).then(res => setPlayerPokemon(res));
        }
    }, [playerSelection])
    useEffect(() => {
        if (opponentSelection?.url) {
            transformPokemonResult(opponentSelection!).then(res => setOpponentPokemon(res));
        }
    }, [opponentSelection])



    return (
        <div data-testid={'game'}>
            <Header winner={winner} />
            <WinnerModal winnerName={winner}/>
            <PokemonSelector
                availablePokemon={availablePokemon}
                setPlayerPokemon={(pokemon: PokemonResult) => setPlayerSelection(pokemon)}
                setOpponentPokemon={(pokemon: PokemonResult) => setOpponentSelection(pokemon)}
                selectionCompleteCallback={() => setActivePlayer(1)}
            />
            {playerPokemon &&
                <Character
                    name={playerPokemon.name}
                    baseHp={playerPokemon.baseHp}
                    currentHp={playerPokemon.currentHp}
                    moves={playerPokemon.moves}
                    imgUrl={playerPokemon.imgUrl}
                    attackCallback={(move) => onPlayerAttackClicked(move)}
                    disabledButtons={!!winner || activePlayer !== 1}
                />
            }
            <div style={{ height: '100px' }}></div>
            {opponentPokemon &&
                <Character
                    {...opponentPokemon}
                    attackCallback={(move) => onOpenentAttackClicked(move)}
                    disabledButtons={!!winner  || activePlayer !== 2}
                />
            }
            <BattleLog messages={battleLog}/>
        </div>

    )
}

export default Game