import { HashRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';

// Always land on the homepage on a fresh page load/refresh, regardless of
// whatever route was open before -- runs once at module load, before the
// router (or anything else) reads the current hash, so there's no flash of
// the previous page. Clicking "Explore" from the homepage is a client-side
// navigation that never re-runs this module, so it's unaffected.
if (window.location.hash && window.location.hash !== '#/') {
  window.location.hash = '/';
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
