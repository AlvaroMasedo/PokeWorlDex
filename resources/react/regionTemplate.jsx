function Region() {
    return (
        <main>
            <h1>Kanto</h1>
        </main>
    );
}

const regionTemplateRoot = document.getElementById('region-template');
ReactDOM.createRoot(regionTemplateRoot).render(<Region />);