import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import { useSignIn } from '../contexts/SignInContext';
import { useSearch } from '../contexts/SearchContext';

const Navbar = () => {
    const location = useLocation();
    const { isSignIn, setIsSignIn } = useAuth();
    const { handleShow } = useSignIn();
    const { searchTerm, updateSearchTerm } = useSearch(); 

    const getSearchPlaceholder = () => {
        switch (location.pathname) {
            case '/tracks':
                return 'Search track';
            case '/artists':
                return 'Search artist';
            default:
                return '';
        }
    };

    const handleSignOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to sign out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                setIsSignIn(false);
                Swal.fire({
                    title: "Signed Out!",
                    text: "Signed out from admin!",
                    icon: "success"
                });
            }
        });
    };

    const handleSearchChange = (event) => {
        updateSearchTerm(event.target.value);
    };

    return (
        <header>
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
                                {(location.pathname === '/tracks' || location.pathname === '/artists') ? (
                                    <form className="d-flex mx-auto" role="search">
                                        <input 
                                            className="form-control me-2" 
                                            type="search" 
                                            placeholder={getSearchPlaceholder()} 
                                            aria-label="Search" 
                                            value={searchTerm} // Set input value from context
                                            onChange={handleSearchChange} // Update context on change
                                        />
                                        {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                                    </form>
                                ) : (<div></div>)}
                                
                                <div className="d-flex align-items-center px-2">
                                    <div className="mb-0 me-2 text-light">
                                        Signed in as: <span className="text-primary">admin</span>
                                    </div>
                                    <button className="btn btn-outline-danger" onClick={handleSignOut}>Sign Out</button>
                                </div>
                            </div>
                        ) : (
                            <button className="btn btn-outline-light" onClick={handleShow}>Sign In</button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
