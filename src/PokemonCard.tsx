import styles from "./PokemonCard.module.css";

export default function PokemonCard({
    pokemon,
    onClick,
}: {
    pokemon: Pokemon;
    onClick: (pokemon: Pokemon) => void;
}) {
    return (
        <li className={styles.card} onClick={() => onClick(pokemon)}>
            <img src={pokemon.image} />
            <p>{pokemon.name}</p>
        </li>
    );
}
