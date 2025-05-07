import styles from "./PokemonDetail.module.css";
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

    const mainImage = pokemon.sprites.other["official-artwork"].front_default;
    const shinyImage = pokemon.sprites.other["official-artwork"].front_shiny;

    // Extract the images out of the API data into a list
    const images = Object.entries(pokemon.sprites);

    return (
        <section>
            <h1>{pokemon.name}</h1>
            <div className={styles.detail}>
                <div className={styles.card}>
                    <div className={styles.heroImages}>
                        <h3>Normal</h3>
                        <h3>Shiny</h3>
                        <img className={styles.mainImage} src={mainImage} />
                        <img className={styles.shinyImage} src={shinyImage} />
                    </div>
                    <div className={styles.types}>
                        {pokemon.types.map((type) => (
                            <p
                                key={type.slot}
                                className={styles[type.type.name]}
                            >
                                {type.type.name}
                            </p>
                        ))}
                    </div>
                    <div className={styles.cries}>
                        <h2>Cries</h2>
                        <audio controls src={pokemon.cries.legacy} />
                    </div>
                    <div>
                        <h2>Attributes</h2>
                        <div className={styles.attributes}>
                            <p>Width:</p>
                            <p>{pokemon.weight} </p>
                            <p>Height</p>
                            <p>{pokemon.height}</p>
                        </div>
                    </div>
                    <div className={styles.abilities}>
                        <h2>Abilities</h2>
                        {pokemon.abilities.map((ability) => {
                            return (
                                <p key={ability.slot}>{ability.ability.name}</p>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.images}>
                    {images.map((image) => {
                        // Mixed in with the images are the "other" category, this skips that
                        if (typeof image[1] === "string") {
                            return (
                                <figure className={styles.card} key={image[0]}>
                                    <img src={image[1]} />
                                    <figcaption>
                                        {image[0].replace(/_/g, " ")}
                                    </figcaption>
                                </figure>
                            );
                        }
                    })}
                </div>
            </div>
        </section>
    );
}
