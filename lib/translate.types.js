// translate.types.js

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
  fairy: "Hada",
};

// Funció de traduir tipus
function translateTypes(typeArray) {
  if (!Array.isArray(typeArray)) return [];

  return typeArray.map((type) => {
    return TYPE_ES[type] || formatFallback(type);
  });
}

// Fallback
function formatFallback(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Fer l'arxiu accesible desde altres scripts
window.translateTypes = translateTypes;
