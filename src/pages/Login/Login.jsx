import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import imagemBg from "../../assets/bglogin.jpg";

const Login = () => {
  useEffect(() => {
    // Adiciona o estilo ao body
    document.body.style.background = `
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url('${imagemBg}') no-repeat center center fixed
    `;
    document.body.style.backgroundSize = "cover";
    document.body.style.height = "100vh";
    document.body.style.margin = "0";

    // Remove o estilo ao sair da página
    return () => {
      document.body.style.background = "";
      document.body.style.backgroundSize = "";
      document.body.style.height = "";
      document.body.style.margin = "";
    };
  });

  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Para navegação após o login bem-sucedido

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!matricula || !senha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        matricula,
        senha,
      });

      const { token } = response.data; // Obtemos o token do servidor

      // Salva o token no armazenamento local para futuras requisições
      localStorage.setItem("token", token);

      setError(""); // Limpa mensagens de erro
      console.log("Login realizado com sucesso!");

      // Redireciona para a página dos cards
      navigate("/cards");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Erro no login.");
      } else {
        setError("Erro no servidor.");
      }
    }
  };

  return (
    <>
      <div className="container  d-flex flex-column justify-content-center align-items-center min-vh-100">
        <h1 className="mb-4 text-light">Entre na sua conta</h1>
        <form
          style={{ maxWidth: "650px" }}
          className="w-75 bg-dark border border-dark p-4 rounded shadow"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="matricula" className="form-label text-white">
              Matrícula:
            </label>
            <input
              type="text"
              className="form-control"
              id="matricula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              placeholder="Digite sua matrícula"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="text-white form-label">
              Senha:
            </label>
            <input
              type="password"
              className="form-control"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary w-100 btn-submit">
            Entrar
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
