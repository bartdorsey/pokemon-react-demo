/// <reference types="vite/client" />

// These  are the TypeScript types for the data we get back from the API

type PokemonListResponse = {
    count: number;
    next?: string;
    previous?: string;
    results: Pokemon[];
};

type Pokemon = {
    id: number;
    name: string;
    url: string;
    image: string;
};

type Ability = {
    name: string;
    url: string;
};

type PokemonDetail = {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: {
        ability: Ability;
        is_hidden: boolean;
        slot: number;
    }[];
    cries: {
        latest: string;
        legacy: string;
    };
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    sprites: {
        back_default: string;
        back_female: string;
        back_shiny: string;
        back_shiny_female: string;
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
        other: {
            ["official-artwork"]: {
                front_default: string;
                front_shiny: string;
            };
        };
    };
    moves: {
        move: {
            name: string;
            url: string;
        };
    }[];
};
