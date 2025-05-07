import styles from "./Nav.module.css";
import { NavLink } from "react-router";

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/pokedex" end>
                        Pokedex
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
