import { useNavigate } from "react-router-dom";
import { IoMdExit } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const GoToTurma = () => {
    navigate("/turma");
  };

  const GoToHome = () => {
    navigate("/cards");
  };

  // Pegando o token do localStorage
  const token = localStorage.getItem("token");
  let primeironome = "Aluno";

  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodificando o token JWT
    primeironome = decodedToken.primeironome || "Aluno"; // Pegando o primeironome do token
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow-sm">
        <div className="container">
          <span className="navbar-brand">
            Bem-vindo(a), <strong>{primeironome}</strong> 👋
          </span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse px-2" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  style={{ cursor: "pointer" }}
                  className="nav-link "
                  aria-current="page"
                  onClick={GoToHome}
                >
                  Início
                </a>
              </li>

              <li className="nav-item me-4">
                <a
                  style={{ cursor: "pointer" }}
                  className="nav-link "
                  aria-current="page"
                  onClick={GoToTurma}
                >
                  Ver turma
                </a>
              </li>

              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-danger d-flex align-items-center justify-content-center gap-2"
                >
                  Sair
                  <IoMdExit className="mt-1" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
