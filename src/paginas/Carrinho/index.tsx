import TituloPrincipal from "../../componentes/TituloPrincipal";
import ItemCarrinho from "../../componentes/ItemCarrinho";
import { AbBotao } from "ds-alurabooks";
import { Link } from "react-router-dom";
import { formatador } from "../../utils/formatador-moeda";
import { useCarrinhoContext } from "../../contextApi/hooks/useCarrinhoContext";
import "./Carrinho.css";

const Carrinho = () => {

  const { carrinho } = useCarrinhoContext()

  if (!carrinho) {
    return (<h1>Erro</h1>)
  }

  return (<>
    <TituloPrincipal texto="Minha sacola" />
    <section className="carrinho">
      <form>
        <h2 className="carrinho__titulo-principal">Itens selecionados</h2>
        <ul>
          {carrinho?.itens.map(item => <ItemCarrinho key={item.livro.id} item={item} />)}
          <Link to="/">Continuar comprando</Link>
        </ul>
        <footer className="carrinho_rodape-formulario">
          <h3>Total da compra</h3>
          <p>{formatador.format(carrinho?.total)}</p>
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