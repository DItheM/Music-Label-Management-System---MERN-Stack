import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Tracks from './pages/Tracks';
import Artists from './pages/Artists';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/home"
              element={<Home/>}
            />
            <Route
              path="/tracks"
              element={<Tracks/>}
            />
            <Route
              path="/artists"
              element={<Artists/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
