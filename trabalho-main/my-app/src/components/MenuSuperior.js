import { Link } from "react-router-dom";

const MenuSuperior = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-primary sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand text-dark">
          ADM Imobiliaria Fogaça
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link active text-dark">
              Listagem
            </Link>
          </li>
          <li className="nav-item">
            <Link to="inclusao" className="nav-link text-dark">
              Inclusão
            </Link>
          </li>
          <li className="nav-item">
            <Link to="gerencia" className="nav-link text-dark">
              Gerência
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuSuperior;
