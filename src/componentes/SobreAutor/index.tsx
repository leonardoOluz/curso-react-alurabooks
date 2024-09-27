import { useQuery } from "@tanstack/react-query";
import { obterAutorPorID } from "../../http";
import SobreTitulo from "../SobreTitulo";
import Loader from "../Loader";
import { IAutor } from "../../interfaces/IAutor";

interface SobreAutorProps {
  autorId: number
}

const SobreAutor = ({ autorId }: SobreAutorProps) => {
  const { data: autor, isLoading } = useQuery<IAutor>({
    queryKey: ['autor', autorId],
    queryFn: () => obterAutorPorID(autorId)
  })

  if (isLoading || !autor) {
    return <Loader />
  }

  return <SobreTitulo
    titulo="Sobre o Autor"
    texto={autor?.sobre}
  />
}

export default SobreAutor;