// eslint-disable-next-line react/prop-types
const CardConteudo = ({ title, text, onViewContent }) => {
  return (
    <div className="col-12 col-md-4 mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
          <button onClick={onViewContent} className="btn btn-primary">
            Ver conteúdo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardConteudo;
