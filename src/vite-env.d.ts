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

type PokemonDetail = {
    id: number;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
};
