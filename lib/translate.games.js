// gameTranslations.js

// Diccionari de traduccions de noms de jocs
const GAME_TRANSLATIONS_ES = {
  red: "Pokémon Rojo",
  blue: "Pokémon Azul",
  yellow: "Pokémon Amarillo",
  green: "Pokémon Verde",
  "red-japan": "Pokémon Rojo (Japón)",
  "blue-japan": "Pokémon Azul (Japón)",
  "green-japan": "Pokémon Verde (Japón)",
  gold: "Pokémon Oro",
  silver: "Pokémon Plata",
  heartgold: "Pokémon Oro HeartGold",
  soulsilver: "Pokémon Plata SoulSilver",
  firered: "Pokémon Rojo Fuego",
  leafgreen: "Pokémon Verde Hoja",
  crystal: "Pokémon Cristal",
  ruby: "Pokémon Rubí",
  sapphire: "Pokémon Zafiro",
  emerald: "Pokémon Esmeralda",
  "omega-ruby": "Pokémon Rubí Omega",
  "alpha-sapphire": "Pokémon Zafiro Alfa",
  "brilliant-diamond": "Pokémon Diamante Brillante",
  "shining-pearl": "Pokémon Perla Reluciente",
  diamond: "Pokémon Diamante",
  pearl: "Pokémon Perla",
  platinum: "Pokémon Platino",
  black: "Pokémon Negro",
  white: "Pokémon Blanco",
  "black-2": "Pokémon Negro 2",
  "white-2": "Pokémon Blanco 2",
  "lets-go-pikachu": "Pokémon: Let's Go, Pikachu",
  "lets-go-eevee": "Pokémon: Let's Go, Eevee",
  x: "Pokémon X",
  y: "Pokémon Y",
  "the-isle-of-armor": "Pokémon La Isla de la Armadura (DLC)",
  "the-crown-tundra": "Pokémon La Tundra Corona (DLC)",
  sun: "Pokémon Sol",
  moon: "Pokémon Luna",
  "ultra-sun": "Pokémon Ultrasol",
  "ultra-moon": "Pokémon Ultraluna",
  "the-teal-mask": "Pokémon La Máscara Turquesa (DLC)",
  "the-indigo-disk": "Pokémon El Disco Índigo (DLC)",
  sword: "Pokémon Espada",
  shield: "Pokémon Escudo",
  
  scarlet: "Pokémon Escarlata",
  violet: "Pokémon Púrpura",
};

// Funció de traduir jocs
function translateGameNames(gameArray) {
  if (!Array.isArray(gameArray)) return [];

  return gameArray.map((game) => {
    return GAME_TRANSLATIONS_ES[game] || formatFallback(game);
  });
}

//  Fallback
function formatFallback(slug) {
  return slug
    .split("-")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

// Fer l'arxiu accesible desde altres scripts
window.translateGameNames = translateGameNames;