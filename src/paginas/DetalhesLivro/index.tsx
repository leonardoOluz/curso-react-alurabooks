import TituloPrincipal from "../../componentes/TituloPrincipal";
import Loader from "../../componentes/Loader";
import { AbBotao, AbGrupoOpcao, AbGrupoOpcoes, AbInputQuantidade } from "ds-alurabooks";
import { useParams } from "react-router-dom";
import { obterLivroPorSlug } from "../../http";
import { useQuery } from "@tanstack/react-query";
import { ILivro } from "../../interfaces/ILivro";
import { formatador } from "../../utils/formatador-moeda";
import "./DetalhesLivro.css";
import SobreTitulo from "../../componentes/SobreTitulo";
import SobreAutor from "../../componentes/SobreAutor";
import { useState } from "react";
import { AxiosError } from "axios";

const DetalhesLivro = () => {
  const [quantidade, setQuatidade] = useState<number>(0);
  const { slug } = useParams();

  const { data: livro, isLoading, error } = useQuery<ILivro | null, AxiosError>({
    queryKey: ['livro'],
    queryFn: () => obterLivroPorSlug(slug!)
  })

  if (livro === null) {
    return <h1>Livro não encontrado!</h1>
  }

  if(error){
    console.log(error.message)
    return <p>Ops, Algo de errado ocorreu!</p>
  }

  if (isLoading || !livro) {
    return (<Loader />)
  }

  const opcoes: AbGrupoOpcao[] = livro.opcoesCompra
    ? livro.opcoesCompra.map(opcao => ({
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
            <img src={livro?.imagemCapa} alt="imagem da capa do livro" />
          </figure>
          <div className="container-detalhes__descricoes">
            <h2 className="descricoes-titulo">{livro?.titulo}</h2>
            <p>{livro?.descricao}</p>
            <SobreAutor
              autorId={livro.autor}
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
            autorId={livro.autor}
          />
          <SobreTitulo
            titulo="Sobre o Livro"
            texto={livro.sobre}
          />
        </div>
      </section>
    </>
  )
}

export default DetalhesLivro;