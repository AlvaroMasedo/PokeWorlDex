// TypeBadge.jsx
/**
 * Componente reutilizable para mostrar tipos de Pokémon
 * Se usa en múltiples lugares (Pokédex, fichas de Pokémon, tabla de tipos)
 */

function TypeBadge({ type, typeColor, typeNameES, size = "medium" }) {
    const sizeClasses = {
        small: "type-badge-small",
        medium: "type-badge-medium",
        large: "type-badge-large",
    };

    return (
        <span
            className={`type-badge ${sizeClasses[size] || sizeClasses.medium}`}
            style={{ backgroundColor: typeColor }}
            title={typeNameES}
        >
            {typeNameES}
        </span>
    );
}
