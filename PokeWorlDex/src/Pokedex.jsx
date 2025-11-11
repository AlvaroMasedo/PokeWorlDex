import React from "react";

export default function Pokedex(props) {
    const EQUIPOENTRENADOR = {
        nombre: "Ash",
        equipo: ["Charizard", "Venusaur", "Pikachu", "Weedle", "Lucario", "Hoppip"]
    };
    return (
        <div>
            <h2>El entrenador {EQUIPOENTRENADOR.nombre} te desafía</h2>
            <p>Su equipo es:</p>
            <ul>
                {EQUIPOENTRENADOR.equipo.map((pokemon) => (
                    <li key={pokemon}>{pokemon}</li>
                ))}
            </ul>
        </div>
    );
}