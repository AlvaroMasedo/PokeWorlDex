// TypeSelector.jsx
/**
 * Componente reutilizable para seleccionar tipos
 * Se usa en la tabla de tipos interactiva
 */

function TypeSelector({ allTypes, selectedTypes, typeColor, typeNameES, onTypeToggle, maxTypes = 2 }) {
    return (
        <div className="tipo-selector">
            {allTypes.map((type) => (
                <button
                    key={type}
                    className={`tipo-button ${selectedTypes.includes(type) ? "selected" : ""}`}
                    style={{
                        backgroundColor: selectedTypes.includes(type) ? typeColor(type) : "#f0f0f0",
                        color: selectedTypes.includes(type) ? "#fff" : "#333",
                        borderColor: typeColor(type),
                    }}
                    onClick={() => onTypeToggle(type)}
                    disabled={selectedTypes.length === maxTypes && !selectedTypes.includes(type)}
                >
                    {typeNameES(type) || type}
                </button>
            ))}
        </div>
    );
}
