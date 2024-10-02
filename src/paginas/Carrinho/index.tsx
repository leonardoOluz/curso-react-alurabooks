import { useCarrinho } from "../../Graphql/carrinho/hooks";
import TituloPrincipal from "../../componentes/TituloPrincipal";
import { AbBotao } from "ds-alurabooks";
import "./Carrinho.css";
import { Link } from "react-router-dom";
import ItemCarrinho from "../../componentes/ItemCarrinho";
import { formatador } from "../../utils/formatador-moeda";

const Carrinho = () => {
  const { data } = useCarrinho();

  if (!data) {
    return (<h1>Erro</h1>)
  }

  return (<>
    <TituloPrincipal texto="Minha sacola" />
    <section className="carrinho">
      <form>
        <h2 className="carrinho__titulo-principal">Itens selecionados</h2>
        <ul>
          {data.carrinho.itens.map(item => <ItemCarrinho key={item.livro.id} item={item} />)}
          <Link to="/">Continuar comprando</Link>
        </ul>
        <footer className="carrinho_rodape-formulario">
          <h3>Total da compra</h3>
          <p>{formatador.format(data?.carrinho?.total)}</p>
          <AbBotao
            onClick={() => { }}
            texto="Finalizar compra"
            tipo="primario"
          />
        </footer>
      </form>
    </section>
  </>)
};

export default Carrinho;