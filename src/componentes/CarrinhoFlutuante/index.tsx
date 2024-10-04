import Titulo from "../Titulo";
import { AbBotao } from "ds-alurabooks";
import { useCarrinho } from "../../Graphql/carrinho/hooks";
import "./CarrinhoFlutuante.css";
import { useNavigate } from "react-router-dom";

interface ICarrinhoFlutuanteProps {
  aoAbrirSacola: () => void
}

const CarrinhoFLutuante = ({ aoAbrirSacola }: ICarrinhoFlutuanteProps) => {
  const { data } = useCarrinho()
  const navigate = useNavigate();

  const aoClicarNoBotao = () => {
    navigate('minha-sacola')
    aoAbrirSacola()
  }

  return (<div className="sacola-flutuante">
    <Titulo texto="Resumo da compra" />
    <ul className="sacola-flutuante__lista">
      {data?.carrinho.itens.map(item => (
        <li key={item.livro.id}>
          <h4>{item.livro.titulo}</h4>
          <p>Autoria: {item.livro.autor.nome}</p>
        </li>
      ))}
    </ul>
    <AbBotao
      onClick={aoClicarNoBotao}
      texto="Ver sacola"
    />
  </div>)
}

export default CarrinhoFLutuante;