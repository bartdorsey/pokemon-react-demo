import { useState } from "react";
import PokemonCard from "./PokemonCard";
import { usePokemons } from "./hooks";
import PokemonDetail from "./PokemonDetail";

export default function PokemonList() {
    const { pokemons, error, loading, next } = usePokemons(20);
    const [selectedPokemon, setSelectedPokemon] =
        useState<PokemonDetail | null>(null);
    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <h1>{error.message}</h1>;
    }

    async function handleClick(pokemon: Pokemon) {
        try {
            const response = await fetch(pokemon.url);
            if (!response.ok) {
                throw new Error("Couldn't fetch pokemon details");
            }
            const pokemonDetail = (await response.json()) as PokemonDetail;
            setSelectedPokemon(pokemonDetail);
        } catch (e) {
            if (e instanceof Error) {
            }
        }
    }

    return (
        <>
            <button onClick={next}>Load More</button>
            {selectedPokemon && (
                <PokemonDetail
                    pokemon={selectedPokemon}
                    onClose={() => setSelectedPokemon(null)}
                />
            )}
            <ul className="card-grid">
                {pokemons.map((pokemon) => (
                    <PokemonCard
                        onClick={handleClick}
                        key={pokemon.id}
                        pokemon={pokemon}
                    />
                ))}
            </ul>
        </>
    );
}
