type Move = {
    name: string,
    power: number,
    accuracy: number
}

type PokemonResult = {
    name: string,
    url: string,
}

type PokemonData = {
    name: string,
    baseHp: number,
    currentHp: number,
    imgUrl: string,
    moves: Move[]
}
export type {
    Move,
    PokemonResult,
    PokemonData,
}