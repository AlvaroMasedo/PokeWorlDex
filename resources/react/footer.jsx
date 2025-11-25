function Footer(){
    return(
        <footer>
            <ul>
                <li><a><img src="" alt="" /></a></li>
                <li><a><img src="" alt="" /></a></li>
                <li><a><img src="" alt="" /></a></li>
                <li><a><img src="" alt="" /></a></li>
            </ul>
        </footer>
    );
}

const footerRoot = document.getElementById('footer-root');
ReactDOM.createRoot(footerRoot).render(<Footer />);