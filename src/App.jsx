/**
 * Componente principal da aplicação, responsável por configurar as rotas usando React Router.
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Wishlist from "./Pages/Wishlist";

/**
 * Componente que define as rotas da aplicação.
 * @returns {JSX.Element} Elemento JSX que representa as rotas da aplicação.
 */
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
};

export default App;
