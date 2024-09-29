// import { ICategaria } from "../../interfaces/ICategaria";
import "./ListaLivros.css"
import CardLivro from "../CardLivro";
import { gql, useQuery } from "@apollo/client";
import { ILivro } from "../../interfaces/ILivro";
import { ICategaria } from "../../interfaces/ICategaria";
import { AbBotao, AbCampoTexto } from "ds-alurabooks";
import { useState } from "react";

interface ListaLivrosProps {
  categoria: ICategaria
}

const OBTER_LIVROS = gql`
  query ObterLivros($categoriaId: Int, $titulo: String) {
  livros(categoriaId: $categoriaId, titulo: $titulo) {
    id
    slug
    titulo
    imagemCapa
    opcoesCompra {
      id
      formatos
      preco
    }
  }
}
`;

const ListaLivros = ({ categoria }: ListaLivrosProps) => {

  const [textoBusca, setTextoBusca] = useState('');

  const { data, refetch } = useQuery<{ livros: ILivro[] }>(OBTER_LIVROS, {
    variables: {
      categoriaId: categoria.id
    }
  });

  const buscarLivros = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    refetch({
      categoriaId: categoria.id,
      titulo: textoBusca
    })

  };

  /* const { data: produtos, isLoading, error } = useQuery<ILivro[], AxiosError>({
    queryKey: ['buscalivrosPorCategoria', categoria],
    queryFn: () => obterProdutosPorCategoria(categoria)
  }) */

  /* if (Error) {
    console.log(error.message)
    return (<h1>Erro ao carregar os livros</h1>)
  } */


  /* if (isLoading || !produtos) {
    return (<Loader />)
  } */

  return (<section>
    <form onSubmit={buscarLivros} style={{ maxWidth: "60%", margin: "0 auto", textAlign: "center" }}>
      <AbCampoTexto
        value={textoBusca}
        onChange={setTextoBusca}
        placeholder="Digite o titulo"
      />
      <div style={{ marginTop: "1rem" }}>
        <AbBotao texto="Buscar" />
      </div>
    </form>
    <div className="livros">
      {data?.livros.map(livro => <CardLivro key={livro.id} livro={livro} />)}
    </div>
  </section>)
}

export default ListaLivros;