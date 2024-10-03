import { AbInputQuantidade } from "ds-alurabooks"
import { IItemCarrinho } from "../../interfaces/IItemCarrinho";
import { formatador } from "../../utils/formatador-moeda";
import "./ItemCarrinho.css"

interface ItemProps {
    item: IItemCarrinho;
}

const ItemCarrinho = ({ item }: ItemProps) => {

    return (
        <li className="carrinho__lista-itens">
            <figure>
                <img src={item.livro.imagemCapa} alt={`capa do livro ${item.livro.descricao}`} />
            </figure>
            <figcaption>
                <h2 className="carrinho__titulo-itens">{item.livro.titulo}</h2>
                <p>{item.livro.descricao}</p>
                <span>Por: {item.livro.autor.nome}</span>
            </figcaption>
            <fieldset>
                <div>
                    <h3 className="carrinho__titulo-itens">Preço</h3>
                    <p className="carrinho_valor-itens">{formatador.format(item.opcaoCompra.preco)}</p>
                </div>
                <AbInputQuantidade onChange={() => { }} value={item.quantidade} />
                <div>
                    <h3 className="carrinho__titulo-itens">Remover</h3>
                    <button className="carrinho__btn-remove">
                        <svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.0881 10.25V26.0833H5.42139V10.25H18.0881ZM15.7131 0.75H7.79639L6.21305 2.33333H0.671387V5.5H22.8381V2.33333H17.2964L15.7131 0.75ZM21.2547 7.08333H2.25472V26.0833C2.25472 27.825 3.67972 29.25 5.42139 29.25H18.0881C19.8297 29.25 21.2547 27.825 21.2547 26.0833V7.08333Z" fill="#002F52" />
                        </svg>
                    </button>
                </div>
            </fieldset>
        </li>
    )
}

export default ItemCarrinho;