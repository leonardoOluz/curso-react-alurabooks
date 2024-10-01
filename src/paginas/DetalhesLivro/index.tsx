import TituloPrincipal from "../../componentes/TituloPrincipal";
import Loader from "../../componentes/Loader";
import { AbBotao, AbGrupoOpcao, AbGrupoOpcoes, AbInputQuantidade } from "ds-alurabooks";
import { useParams } from "react-router-dom";
import { formatador } from "../../utils/formatador-moeda";
import "./DetalhesLivro.css";
import SobreTitulo from "../../componentes/SobreTitulo";
import SobreAutor from "../../componentes/SobreAutor";
import { useState } from "react";
import { useLivro } from "../../Graphql/Livros/hoos";

const DetalhesLivro = () => {
  const [quantidade, setQuatidade] = useState<number>(0);
  const { slug } = useParams();

  const { data, loading } = useLivro(slug || '')

  /* const { data: livro, isLoading, error } = useQuery<ILivro | null, AxiosError>({
    queryKey: ['livro'],
    queryFn: () => obterLivroPorSlug(slug!)
  }) */

  if (data?.livro === null) {
    return <h1>Livro não encontrado!</h1>
  }

  if (!data?.livro) {
    return <p>Ops, Algo de errado ocorreu!</p>
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
            <SobreAutor
              autorId={data.livro.autorId}
              nome
            />
            <h3>Selecione o formato de seu livro</h3>
            <div className="container-detalhes__descricoes-grupo-opcoes">
              <AbGrupoOpcoes
                opcoes={opcoes}
                onChange={() => { }}
                valorPadrao={opcoes[0]}
              />
            </div>
            <span>*Você terá acesso às futuras atualizações do livro.</span>
            <AbInputQuantidade
              onChange={setQuatidade}
              value={quantidade}
            />
            <AbBotao texto="Comprar" />
          </div>
        </div>
        <div className="detalheslivro__sobre">
          <SobreAutor
            autorId={data.livro.autorId}
          />
          <SobreTitulo
            titulo="Sobre o Livro"
            texto={data.livro.sobre}
          />
        </div>
      </section>
    </>
  )
}

export default DetalhesLivro;