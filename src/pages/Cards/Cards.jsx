import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import CardConteudo from "../../components/CardConteudo/CardConteudo";

const Cards = () => {
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Dados locais para os cards
  const cardsData = [
    {
      id: 1,
      title: "Primeira Aula",
      text: "Aula do dia 14/11/2024",
      route: "/conteudo/1",
    },
    {
      id: 2,
      title: "Segunda Aula",
      text: "Aula do dia 21/11/2024",
      route: "/conteudo/2",
    },
    {
      id: 3,
      title: "Terceira Aula",
      text: "Aula do dia 28/11/2024",
      route: "/conteudo/3",
    },
  ];

  useEffect(() => {
    const fetchCards = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login"); // Redireciona para login se não houver token
        return;
      }

      try {
        const response = await axios.get(
          "https://cfepmae-production.up.railway.app/cards",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(response.data.message);
      } catch (error) {
        console.error(error);
        setMessage("Erro ao acessar os cards. Faça login novamente.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchCards();
  }, [navigate]);

  const handleViewContent = (route) => {
    navigate(route); // Redireciona para a rota específica
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          {cardsData.map((card) => (
            <CardConteudo
              key={card.id}
              title={card.title}
              text={card.text}
              onViewContent={() => handleViewContent(card.route)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
