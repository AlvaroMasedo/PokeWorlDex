function Header() {
    return (
        <header className="header">
            <div className="left"></div>

            <a className="title" href="/index.html" title="Home">PokéWorlDex</a>

            <ul className="nav">
                <li><a href="/app/view/regions.html">Regiones</a></li>
                <li><a href="/app/view/tablatipos.html">Tabla de tipos</a></li>
                <li><a href="/app/view/personajes.html">Personajes</a></li>
                <li><a href="/app/view/pokedex.html">Pokédex</a></li>
            </ul>

            <ul className="auth">
                <li><a href="/app/view/login.html">Login</a></li>
                <li><a href="/app/view/signup.html">Sign Up</a></li>
            </ul>
        </header>
    );
}

const headerRoot = document.getElementById('header-root');
ReactDOM.createRoot(headerRoot).render(<Header />);