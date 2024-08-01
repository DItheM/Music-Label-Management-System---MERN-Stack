import { Link, useLocation } from "react-router-dom";
import SignInModel from "./SignInModal";
import { useState } from "react";

const Navbar = () => {
    const location = useLocation();

    const [showSignInModal, setShowSignInModal] = useState(false);

    const handleShow = () => setShowSignInModal(true);
    const handleClose = () => setShowSignInModal(false);
    
    return (
        <header>
            <SignInModel show={showSignInModal} handleClose={handleClose} />
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">dRECORDS.</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link 
                                    to="/home" 
                                    className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`} 
                                    aria-current={location.pathname === '/home' ? 'page' : undefined}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    to="/tracks" 
                                    className={`nav-link ${location.pathname === '/tracks' ? 'active' : ''}`}
                                    aria-current={location.pathname === '/tracks' ? 'page' : undefined}
                                >
                                    Tracks
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    to="/artists" 
                                    className={`nav-link ${location.pathname === '/artists' ? 'active' : ''}`}
                                    aria-current={location.pathname === '/artists' ? 'page' : undefined}
                                >
                                    Artists
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <div>
                            <button className="btn btn-outline-light" onClick={handleShow}>Sign In</button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;
