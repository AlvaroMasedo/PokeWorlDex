function Region() {
    return (
        <main>
            <div class="parent">
                <nav>
                    <h2>Puntos de interés</h2>
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
                </div>
            </div>
            <div className="info">
                
            </div>
        </main>
    );
}

const regionTemplateRoot = document.getElementById('region-template');
ReactDOM.createRoot(regionTemplateRoot).render(<Region />);