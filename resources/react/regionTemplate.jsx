function Region() {
    return (
        <main>
            <div class="parent">
                <nav>
                    <h3>Puntos de interés</h3>
                    <div>
                        <div>
                            <img class="punts-interes" src="../../resources/img/maps/KantoMap.webp" alt="Kanto region map"></img>
                            <a href="mapa.html" class="button">Kanto</a>
                        </div>
                        <div>
                            <img class="punts-interes" src="../../resources/img/maps/KantoMap.webp" alt="Kanto region map"></img>
                            <a href="mapa.html" class="button">Kanto</a>
                        </div>
                    </div>
                </nav>
                <div class="section-region">
                    <h1>KANTO</h1>
                    <p class="text">Kanto es una región del Universo Pokemon que aparece en los primeros juegos de la serie.</p>
                    <h3>Videojuegos de la Saga</h3>
                    <h3>Profesor Pokémon</h3>
                    <h3>Pokédex Nacional</h3>
                </div>
            </div>
            <div className="info">
                <h2>Pueblo paleta</h2>
                <p>Información sobre Pueblo Paleta.</p>
                <h3></h3>
            </div>
        </main>
    );
}

const regionTemplateRoot = document.getElementById('region-template');
ReactDOM.createRoot(regionTemplateRoot).render(<Region />);