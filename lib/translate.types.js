const TYPE_ES = {
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
  fairy: "Hada"
};

// Funció de traduir tipus
function translateTypes(TYPE_ES) {
  if (!Array.isArray(TYPE_ES)) return [];

  return TYPE_ES.map((game) => {
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