import { Link } from "react-router";
import styles from "./PokemonCard.module.css";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
    return (
        <figure className={styles.card}>
            <Link to={`/pokedex/${pokemon.id}`}>
                <img src={pokemon.image} />
                <figcaption>{pokemon.name}</figcaption>
            </Link>
        </figure>
    );
}
