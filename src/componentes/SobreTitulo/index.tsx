import "./SobreTitulo.css"

interface PropsSobreTitulo {
    titulo: string
    texto: string
}

const SobreTitulo = ({texto, titulo}: PropsSobreTitulo) => {
    return (
        <>
            <h2 className="sobre-titulo">{titulo}</h2>
            <p className="detalheslivro__sobre-texto">{texto}</p>
        </>
    )
}

export default SobreTitulo;