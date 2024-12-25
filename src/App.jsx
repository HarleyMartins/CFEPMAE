import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cards from "./pages/Cards/Cards";
import Conteudo from "./pages/Conteudo/Conteudo"; // Página para exibir o conteúdo de cada card
import Login from "./pages/Login/Login";
import Turma from "./pages/Turma/Turma";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/turma" element={<Turma />}></Route>
        <Route path="/conteudo/:id" element={<Conteudo />} />{" "}
        {/* Rota dinâmica */}
      </Routes>
    </Router>
  );
}

export default App;
