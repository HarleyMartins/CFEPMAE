import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";

const Conteudo = () => {
  const { id } = useParams(); // Obtém o ID do card clicado

  const conteudos = {
    1: "https://www.notion.so/Aula-do-dia-14-11-2024-72f4656d60c5436e874d00440207cd58?pvs=4",
    2: "https://www.notion.so/Aula-do-dia-21-11-2024-15d146a691f580b0abb2d8e3e23f2721?pvs=4",
    3: "Sem conteúdos ainda",
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column align-items-center mt-5 text-white">
        <h1>Conteúdo</h1>
        <a target="_blank" rel="noopener noreferrer" href={conteudos[id]}>
          Conteúdo no Notion
        </a>
      </div>
    </>
  );
};

export default Conteudo;
