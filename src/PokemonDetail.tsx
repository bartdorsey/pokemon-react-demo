import { useParams } from "react-router";
import { usePokemon } from "./hooks";

export default function PokemonDetail() {
    const { id } = useParams();
    const { pokemon, error } = usePokemon(id);

    if (error) {
        return <h1>{error.message}</h1>;
    }

    if (!pokemon) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <img src={pokemon.sprites.front_default} />
            <p>Width: {pokemon.weight} </p>
            <p>Height: {pokemon.height}</p>
        </div>
    );
}
