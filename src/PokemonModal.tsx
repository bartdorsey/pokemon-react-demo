import styles from "./PokemonModal.module.css";

console.log(styles);
export default function PokemonModal({
    pokemon,
    onClose,
}: {
    pokemon: PokemonDetail;
    onClose: () => void;
}) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalClose} onClick={onClose}>
                    ❌
                </div>
                <img src={pokemon.sprites.front_default} />
                <p>Width: {pokemon.weight} </p>
                <p>Height: {pokemon.height}</p>
            </div>
        </div>
    );
}
