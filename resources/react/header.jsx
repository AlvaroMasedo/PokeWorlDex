function Header() {
    return (
        <header className="header">
            <div className="left"></div>

            <a className="title" href="/index.html" title="Home">PokéWorlDex</a>

            <ul className="nav">
                <li><a title="Regiones" href="/app/view/regions.html">Regiones</a></li>
                <li><a title="Tabla de Tipos" href="/app/view/tablatipos.html">Tabla de tipos</a></li>
                <li><a title="Personajes" href="/app/view/personajes.html">Personajes</a></li>
                <li><a title="Pokédex" href="/app/view/pokedex.html">Pokédex</a></li>
            </ul>

            <ul className="auth">
                <li><a title="Log In" href="/app/view/login.html">Login</a></li>
                <li><a title="Sign In" href="/app/view/signup.html">Sign Up</a></li>
            </ul>
        </header>
    );
}

const headerRoot = document.getElementById('header-root');
ReactDOM.createRoot(headerRoot).render(<Header />);