import "./ListaLivros.css"
import CardLivro from "../CardLivro";
import { ICategaria } from "../../interfaces/ICategaria";
import { AbCampoTexto } from "ds-alurabooks";
import { useEffect, useState } from "react";
import { useQueryLivros } from "../../Graphql/Livros/hooks";
import { useReactiveVar } from "@apollo/client";
import { filtroLivrosVar, livrosVar } from "../../Graphql/Livros/state";

interface ListaLivrosProps {
  categoria: ICategaria
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {

  const [textoBusca, setTextoBusca] = useState('');

  const livros = useReactiveVar(livrosVar)

  useEffect(() => {
    filtroLivrosVar({
      ...filtroLivrosVar(),
      titulo: textoBusca.length >= 3 ? textoBusca : ''
    })
  }, [textoBusca])

  filtroLivrosVar({
    ...filtroLivrosVar(),
    categoria
  })

  useQueryLivros()


  return (<section>
    <form style={{ maxWidth: "60%", margin: "0 auto", textAlign: "center" }}>
      <AbCampoTexto
        value={textoBusca}
        onChange={setTextoBusca}
        placeholder="Digite o titulo"
      />
    </form>
    <div className="livros">
      {livros.map(livro => <CardLivro key={livro.id} livro={livro} />)}
    </div>
  </section>)
}

export default ListaLivros;