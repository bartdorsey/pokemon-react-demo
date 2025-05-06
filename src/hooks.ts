import { useState, useEffect } from "react";

const baseURL = "https://pokeapi.co/api/v2/";

type PokemonListResponse = {
    count: number;
    next?: string;
    previous?: string;
    results: Pokemon[];
};

function extractIdFromUrl(url: string): number {
    const id = Number(url.split("/")[6]);
    return id;
}

function buildPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function usePokemons(initialLimit: number = 20) {
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(initialLimit);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    function next() {
        setOffset(offset + limit);
    }
    function prev() {
        setOffset(offset - limit);
    }

    useEffect(() => {
        const url = new URL(`${baseURL}/pokemon`);
        url.searchParams.append("limit", `${limit}`);
        url.searchParams.append("offset", `${offset}`);
        async function fetchPokemon() {
            try {
                const response = await fetch(url.href);
                if (!response.ok) {
                    console.error(response.status);
                    throw new Error("Couldn't fetch pokemon");
                }
                const data = (await response.json()) as PokemonListResponse;
                const pokemonsWithIds = data.results.map((pokemon) => {
                    pokemon.id = extractIdFromUrl(pokemon.url);
                    pokemon.image = buildPokemonImageUrl(pokemon.id);
                    return pokemon;
                });
                setPokemons(pokemonsWithIds);
                setLoading(false);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e);
                    setLoading(false);
                }
            }
        }
        fetchPokemon();
    }, [limit, offset]);

    return {
        pokemons,
        error,
        loading,
        next,
        prev,
        setLimit,
        page: offset / limit + 1,
    };
}
