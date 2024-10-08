import Banner from "../../componentes/Banner"
import LivrosDestaque from "../../componentes/LivrosDestaque"
import Newsletter from "../../componentes/Newsletter"
import TagsCategorias from "../../componentes/TagsCategorias"
import Titulo from "../../componentes/Titulo"
import Loader from "../../componentes/Loader"
import { AbCampoTexto } from "ds-alurabooks"
import { useState } from "react"
// import { useQuery } from "@tanstack/react-query"
// import { obterPublic } from "../../http"
// import { ILivro } from "../../interfaces/ILivro"
import './Home.css'
import { useQueryDestaques } from "../../Graphql/Livros/hooks"

const Home = () => {
    const [busca, setBusca] = useState("");

    const { data, loading } = useQueryDestaques();

    return (<section className="home">
        <Banner subtitulo="Encontre em nossa estante o que precisa para seu desenvolvimento!" titulo="Já sabe por onde começar?">
            <form className="buscar">
                <AbCampoTexto
                    placeholder="Qual será sua próxima leitura?"
                    value={busca}
                    onChange={setBusca}
                    darkmode={true}
                    placeholderAlign="center"
                />
            </form>
        </Banner>
        {
            !loading ? <>
                <Titulo texto="ÚLTIMOS LANÇAMENTOS" />
                <LivrosDestaque livros={data!.destaques.lancamentos! || []} />
                <Titulo texto="MAIS VENDIDOS" />
                <LivrosDestaque livros={data!.destaques.maisVendidos! || []} />
            </> : <Loader />
        }
        <TagsCategorias />
        <Newsletter />
    </section>)
}

export default Home