import styles from "./PokemonList.module.css";
import { useState } from "react";
import PokemonCard from "./PokemonCard";
import { usePokemons } from "./hooks";
import PokemonModal from "./PokemonModal";

export default function PokemonList() {
    // most of the logic for fetching the pokemons is in this custom
    // hook located in hooks.js
    const { pokemons, error, loading, next, prev, page, numPages } =
        usePokemons();
    // This is for when there's an error fetching the details of a pokemon
    const [detailError, setDetailError] = useState<Error | null>(null);
    // This holds the currently selected pokemon that appears in the modal
    const [selectedPokemon, setSelectedPokemon] =
        useState<PokemonDetail | null>(null);

    // If we are loading the list, we popup a loading message
    if (loading) {
        return <h1 className="modal-overlay">Loading...</h1>;
    }
    // If there's an error fetching the pokemons, we print this
    if (error) {
        return <h1>{error.message}</h1>;
    }

    // Handles what happens when we click a pokemon
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
                setDetailError(e);
            }
        }
    }

    return (
        <>
            {/* The pager div puts up next and previous buttons */}
            <div className={styles.pager}>
                {page > 1 && <button onClick={prev}>Prev</button>}
                {page < numPages && <button onClick={next}>Next</button>}
            </div>

            <div className={styles.pageNumbers}>
                Page {page} of {numPages}
            </div>

            {/* if we get an error fetching a single pokemon we popup an error */}
            {detailError && <div>{detailError.message}</div>}

            {/* If there's a selected Pokemon we render the pokemondetail modal */}
            {selectedPokemon && (
                <PokemonModal
                    pokemon={selectedPokemon}
                    onClose={() => setSelectedPokemon(null)}
                />
            )}

            {/* This renders the list of all the pokemon in a grid */}
            <ul className={styles.cardGrid}>
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
