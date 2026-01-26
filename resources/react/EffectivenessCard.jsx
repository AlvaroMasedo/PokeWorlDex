// EffectivenessCard.jsx
/**
 * Componente reutilizable para mostrar tarjetas de efectividad
 * Se usa en la tabla de tipos interactiva
 */

function EffectivenessCard({ multiplier, label, emoji, types, typeColor, typeNameES }) {
    if (!types || types.length === 0) {
        return null;
    }

    const cardClass = `effectiveness-card ${multiplier}`;

    return (
        <div className={cardClass}>
            <h3>
                {emoji} {label}
            </h3>
            <div className="type-list">
                {types.map((type) => (
                    <span
                        key={type}
                        className="type-badge"
                        style={{ backgroundColor: typeColor(type) }}
                    >
                        {typeNameES(type)}
                    </span>
                ))}
            </div>
        </div>
    );
}
