import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import CatalogPage from "src/pages/CatalogPage";
import FavoritesPage from "src/pages/FavoritesPage";
import HomePage from "src/pages/HomePage";

function App() {
  return (
    <>
      <header className="header">
        <NavLink className="header-link" to="/">
          Home
        </NavLink>
        <NavLink className="header-link" to="/catalog">
          Catalog
        </NavLink>
        <NavLink className="header-link" to="/favorites">
          Favorites
        </NavLink>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
