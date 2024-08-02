import { Link, useLocation, useNavigate } from "react-router-dom";
import SignInModel from "./SignInModal";
import { useState, useEffect } from "react";
import { ip } from "../Services/Service";
import { useAuth } from "../contexts/AuthContext";

const Navbar = ({handleShow, handleClose, showSignInModal}) => {
    const location = useLocation();

    const { isSignIn, setIsSignIn } = useAuth();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        setIsLoading(true)
        const auth = { username, password }
        const response = await fetch(ip + '/signin', {
            method: 'POST',
            body: JSON.stringify(auth),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (response.ok) {
            handleClose();
            setIsSignIn(true);
            setIsLoading(false);
        } else {
            setIsSignIn(false);
            setIsLoading(false);
        }
    };

    const handleSignOut = () => {
        setIsSignIn(false)
    };

    return (
        <header>
            <SignInModel 
                show={showSignInModal} 
                handleClose={handleClose} 
                setUsername={setUsername} 
                setPassword={setPassword}
                handleSignin={handleSignIn}
                isLoading={isLoading}
            />

            <nav className="navbar navbar-expand-lg navbar-dark bg-body-tertiary" data-bs-theme="dark">
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

                        
                        {isSignIn ? (
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <form className="d-flex mx-auto" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </form>
                                <div className="d-flex align-items-center px-3 py-2">
                                    <div className="mb-0 me-2">
                                        <p className="text-light mb-0 me-2">Signed in as:</p>
                                        <p className="text-primary mb-0 me-2">admin</p>
                                    </div>

                                    <button className="btn btn-outline-danger" onClick={handleSignOut}>Sign Out</button>
                                </div>
                            </div>
                        ) : (
                            <button className="btn btn-outline-light d-flex" onClick={handleShow}>Sign In</button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
