import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import { ThreeDots } from "react-loader-spinner";

const Turma = () => {
  const [alunos, setAlunos] = useState([]); // Para armazenar os dados dos alunos
  const [loading, setLoading] = useState(true); // Para controlar o estado de carregamento
  const [error, setError] = useState(""); // Para armazenar mensagens de erro

  useEffect(() => {
    const fetchTurma = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Você precisa estar logado.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://cfepmae-production.up.railway.app/turma",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAlunos(response.data.alunos); // Armazenando os dados dos alunos no estado
      } catch (error) {
        setError("Erro ao carregar os dados da turma.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTurma(); // Chama a função para buscar os alunos
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 col-md-2 mx-auto d-flex flex-column align-items-center justify-content-center p-4 text-center bg-white rounded-1 mt-5 ">
            <h5 className="m-0">Carregando</h5>

            <ThreeDots
              className="m-n4"
              visible={true}
              height="80"
              width="80"
              color="#218BFC"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2 className="text-center mb-4 text-white">Turma</h2>
        {alunos.length === 0 ? (
          <p className="text-center">Não há alunos para exibir.</p>
        ) : (
          <div className="row">
            {alunos.map((aluno) => (
              <div
                key={aluno.matricula}
                className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center"
              >
                <div className="card  shadow-sm border-light rounded w-75">
                  <div className="card-body p-2 text-center">
                    <img
                      src={aluno.imagem || "https://via.placeholder.com/150"}
                      alt={aluno.primeironome}
                      className="img-fluid rounded-circle mb-2"
                      style={{
                        width: "100px", // Aumentei para 100px
                        height: "100px", // Aumentei para 100px
                        objectFit: "cover",
                      }}
                    />
                    <h5 className="card-title m-0">{aluno.primeironome}</h5>
                    <p className="card-title m-0">{aluno.cargo}</p>
                    <p className="card-title m-0">{aluno.serie_e_curso}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Turma;
