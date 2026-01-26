// constants.js
/**
 * Constantes compartidas por toda la aplicación
 * Este archivo centraliza todos los datos que se repiten en múltiples componentes
 */

/* =========================
   Datos de Pokémon
========================= */

export const POKEMON_REGIONS = {
    kanto: { label: "Kanto", from: 1, to: 151 },
    johto: { label: "Johto", from: 152, to: 251 },
    hoenn: { label: "Hoenn", from: 252, to: 386 },
    sinnoh: { label: "Sinnoh", from: 387, to: 493 },
    teselia: { label: "Teselia", from: 494, to: 649 },
    kalos: { label: "Kalos", from: 650, to: 721 },
    alola: { label: "Alola", from: 722, to: 809 },
    galar: { label: "Galar", from: 810, to: 898 },
    paldea: { label: "Paldea", from: 899, to: 1025 },
};

/* =========================
   Tipos de Pokémon
========================= */

export const TYPE_COLORS = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
};

export const TYPE_NAMES_ES = {
    normal: "Normal",
    fire: "Fuego",
    water: "Agua",
    electric: "Eléctrico",
    grass: "Planta",
    ice: "Hielo",
    fighting: "Lucha",
    poison: "Veneno",
    ground: "Tierra",
    flying: "Volador",
    psychic: "Psíquico",
    bug: "Bicho",
    rock: "Roca",
    ghost: "Fantasma",
    dragon: "Dragón",
    dark: "Siniestro",
    steel: "Acero",
    fairy: "Hada",
};

/* =========================
   URLs de API
========================= */

export const API_BASE = "https://pokeapi.co/api/v2";

export const API_ENDPOINTS = {
    type: `${API_BASE}/type/`,
    pokemon: `${API_BASE}/pokemon/`,
    region: `${API_BASE}/region/`,
    location: `${API_BASE}/location/`,
};
