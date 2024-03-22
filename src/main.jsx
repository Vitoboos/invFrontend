import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Single from "./components/render/Single.jsx";
import Multiple from "./components/render/Multiple.jsx";
import Busqueda from "./components/busqueda/busqueda.jsx";

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/resultados" element={<Single />} />
        <Route path="/equipos" element={<Multiple />} />

        <Route path="busqueda/" element={<Busqueda />} />
      </Routes>
    </Router>
);