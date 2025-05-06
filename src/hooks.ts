import { useState, useEffect } from "react";

const baseURL = "https://pokeapi.co/api/v2/";

/**
 *  @description This function extract the id number from a pokemon's URL
 */
function extractIdFromUrl(url: string): number {
    const id = Number(url.split("/")[6]);
    return id;
}
/**
 *
 * @description This function returns an image URL for a pokemon id
 */
function buildPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

// This is a custom hook. We do this to keep this logic out of the PokemonList component
export function usePokemons(initialLimit: number = 20) {
    // Offset and limit are for pagination of the pokemon
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(initialLimit);
    const [count, setCount] = useState(0);
    // This is where we keep our main list of pokemons
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    // This is where we keep any errors that happen while fetching pokemons
    const [error, setError] = useState<Error | null>(null);
    // This is a loading state, we clear this after pokemons are loaded
    const [loading, setLoading] = useState(true);

    // This changes the offset to move to the next set of pokemon
    function next() {
        setLoading(true);
        setOffset(offset + limit);
    }
    // This changes the offset to move to the prev set of pokemon
    function prev() {
        setLoading(true);
        setOffset(offset - limit);
    }

    // Anytime limit or offset changes,
    // This useEffect will fire and fetch new pokemon
    useEffect(() => {
        // We could just construct the url as a string,
        // but this is another way to do it.
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
                setCount(data.count);
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

    // These are all the values you can destructure from the hook
    return {
        pokemons,
        error,
        loading,
        next,
        prev,
        setLimit,
        count,
        page: offset / limit + 1,
        numPages: Math.round(count / limit),
    };
}
