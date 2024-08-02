import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Tracks from './pages/Tracks';
import Artists from './pages/Artists';
import { useAuth } from './contexts/AuthContext';
import { useEffect, useState } from 'react';

function App() {
  const { isSignIn } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleShow = () => setShowSignInModal(true);
  const handleClose = () => setShowSignInModal(false);

  // Determines the route element based on sign-in status
  const getRouteElement = (Component) => {
    if (isSignIn) {
      return <Component />;
    } else {
      return <Navigate to="/home" replace />;
    }
  };

  useEffect(() => {
    if (!isSignIn) {
      handleShow();
    }
  }, [isSignIn]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar handleClose={handleClose} handleShow={handleShow} showSignInModal={showSignInModal} />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/tracks" element={getRouteElement(Tracks)} />
            <Route path="/artists" element={getRouteElement(Artists)} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
