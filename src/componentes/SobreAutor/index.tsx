import { useQuery } from "@tanstack/react-query";
import { obterAutorPorID } from "../../http";
import SobreTitulo from "../SobreTitulo";
import Loader from "../Loader";
import { IAutor } from "../../interfaces/IAutor";

interface SobreAutorProps {
  autorId: number,
  nome?: boolean
}

const SobreAutor = ({ autorId, nome = false }: SobreAutorProps) => {
  const { data: autor, isLoading } = useQuery<IAutor>({
    queryKey: ['autor', autorId],
    queryFn: () => obterAutorPorID(autorId)
  })

  if (isLoading || !autor) {
    return <Loader />
  }

  if(nome){
    return <p className="descricoes-autor">Por: {autor.nome}</p>
  }

  return <SobreTitulo
    titulo="Sobre o Autor"
    texto={autor?.sobre}
  />
}

export default SobreAutor;