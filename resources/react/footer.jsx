function Footer(){
    return(
        <footer>
            <ul className="navF">
                <li><a><img src="/resources/img/instagram.webp" alt="instagram logo" /></a></li>
                <li><a><img src="/resources/img/yt.webp" alt="youtube logo" /></a></li>
                <li><a><img src="/resources/img/tiktok.webp" alt="tiktok logo" /></a></li>
                <li><a><img src="/resources/img/twt.webp" alt="twitter logo" /></a></li>
            </ul>
            <h3 className="titleAutor">Mark Gras • Alvaro Masedo</h3>
        </footer>
    );
}

const footerRoot = document.getElementById('footer-root');
ReactDOM.createRoot(footerRoot).render(<Footer />);