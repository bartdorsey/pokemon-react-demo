import PokemonList from "./PokemonList";
import { Routes, Route } from "react-router";
import Home from "./Home";
import Nav from "./Nav";
import PokemonDetail from "./PokemonDetail";

function App() {
    return (
        <>
            <header>
                <h1>Pokedex</h1>
                <Nav />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pokedex" element={<PokemonList />} />
                    <Route path="/pokedex/:id" element={<PokemonDetail />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </main>
        </>
    );
}

export default App;
