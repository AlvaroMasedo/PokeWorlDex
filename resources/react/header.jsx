function Header(){
    return(
        <header>
            <a href="/index.html">PokéWorlDex</a>
            <ul class="nav">
                <li><a href="/app/view/regions.html">Regiones</a></li>
                <li><a href="/app/view/tablatipos.html">Tabla de tipos</a></li>
                <li><a href="/app/view/personajes.html">Personajes</a></li>
                <li><a href="/app/view/pokedex.html">Pokédex</a></li>
                <li><a href="/app/view/login.html">Login</a></li>
                <li><a href="/app/view/signup.html">Sign Up</a></li>
            </ul>
        </header>
    );
}

const headerRoot = document.getElementById('header-root');
ReactDOM.createRoot(headerRoot).render(<Header />);