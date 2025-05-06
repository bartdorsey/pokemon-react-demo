/// <reference types="vite/client" />

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
