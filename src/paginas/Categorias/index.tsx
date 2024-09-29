import { useLocation } from "react-router-dom";
import TituloPrincipal from "../../componentes/TituloPrincipal"
import Loader from "../../componentes/Loader";
import ListaLivros from "../../componentes/ListaLivros";
import { ICategaria } from "../../interfaces/ICategaria";

const Categoria = () => {
  const location = useLocation();
  const categoria: ICategaria = location.state;

  if (!categoria) {
    return (
      <Loader />
    )
  }

  return (<section>
    <TituloPrincipal texto={categoria.nome ?? ""} />
    <ListaLivros categoria={categoria} />
  </section>
  )
}

export default Categoria;