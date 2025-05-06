export default function PokemonDetail({
    pokemon,
    onClose,
}: {
    pokemon: PokemonDetail;
    onClose: () => void;
}) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-close" onClick={onClose}>
                    ❌
                </div>
                <img src={pokemon.sprites.front_default} />
                <p>Width: {pokemon.weight} </p>
                <p>Height: {pokemon.height}</p>
            </div>
        </div>
    );
}
