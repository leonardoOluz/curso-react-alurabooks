import TituloPrincipal from "../../componentes/TituloPrincipal";
import Loader from "../../componentes/Loader";
import { AbBotao, AbGrupoOpcao, AbGrupoOpcoes, AbInputQuantidade, AbTag } from "ds-alurabooks";
import { useParams } from "react-router-dom";
import { formatador } from "../../utils/formatador-moeda";
import "./DetalhesLivro.css";
import SobreTitulo from "../../componentes/SobreTitulo";
import { useState } from "react";
import { useLivro } from "../../Graphql/Livros/hooks";
import { useCarrinhoContext } from "../../contextApi/hooks/useCarrinhoContext";

const DetalhesLivro = () => {
  const [quantidade, setQuatidade] = useState<number>(1);

  const [opcao, setOpcao] = useState<AbGrupoOpcao>()

  const { adicionarItemCarrinho } = useCarrinhoContext();

  const { slug } = useParams();

  const { data, loading, error } = useLivro(slug || '')

  if (data === undefined) {
    return <h1>Algo Ocorreu errado</h1>
  }

  if (error) {
    console.log(data === undefined)
    return <h1>Livro não encontrado!</h1>
  }

  if (loading) {
    return (<Loader />)
  }

  const opcoes: AbGrupoOpcao[] = data.livro.opcoesCompra
    ? data.livro.opcoesCompra.map(opcao => ({
      id: opcao.id,
      titulo: opcao.titulo,
      corpo: formatador.format(opcao.preco),
      rodape: opcao.formatos ? opcao.formatos?.join(',') : ''
    }))
    : []

  const aoAdicionarItemAoCarrinho = () => {
    if (!data?.livro) {
      return;
    };
    const opcaoCompra = data.livro.opcoesCompra.find(op => op.id === opcao?.id)
    if (!opcaoCompra) {
      alert('Selecione uma opção de compra')
      return
    }
    adicionarItemCarrinho({
      livro: data.livro,
      opcaoCompra: opcaoCompra,
      quantidade
    })
  }

  return (
    <>
      <TituloPrincipal texto="Detalhes do livro" />
      <section className="detalheslivro">
        <div className="detalheslivro__container-detalhes">
          <figure>
            <img src={data.livro?.imagemCapa} alt="imagem da capa do livro" />
          </figure>
          <div className="container-detalhes__descricoes">
            <h2 className="descricoes-titulo">{data.livro?.titulo}</h2>
            <p>{data.livro?.descricao}</p>
            <p className="descricoes-autor">Por: {data.livro.autor.nome}</p>
            <h3>Selecione o formato de seu livro</h3>
            <div className="container-detalhes__descricoes-grupo-opcoes">
              <AbGrupoOpcoes
                opcoes={opcoes}
                onChange={setOpcao}
                valorPadrao={opcoes[0]}
              />
            </div>
            <span>*Você terá acesso às futuras atualizações do livro.</span>
            <AbInputQuantidade
              onChange={setQuatidade}
              value={quantidade}
            />
            <AbBotao texto="Comprar" onClick={aoAdicionarItemAoCarrinho} />
          </div>
        </div>
        <div className="detalheslivro__sobre">
          <SobreTitulo
            texto={data.livro.autor.sobre}
            titulo="Sobre o Autor"
          />
          <SobreTitulo
            titulo="Sobre o Livro"
            texto={data.livro.sobre}
          />
        </div>
        <div className="tags">
          {data?.livro?.tags.map(tag => <AbTag key={tag.id} texto={tag.nome} contexto="secundario" />)}
        </div>
      </section>
    </>
  )
}

export default DetalhesLivro;