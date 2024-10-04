import { createContext } from "react";
import { ICarrinho } from "../../interfaces/ICarrinho";
import { useAdicionarItem, useCarrinho, useRemoverItem } from "../../Graphql/carrinho/hooks";
import { IItemCarrinho } from "../../interfaces/IItemCarrinho";

export interface ICarrinhoContext {
  carrinho?: ICarrinho
  adicionarItemCarrinho: (item: IItemCarrinho) => void
  removerItemCarrinho: (item: IItemCarrinho) => void
  carregando: boolean
}

interface ICarrinhoProviderProps {
  children: React.ReactNode
}

export const CarrinhoContext = createContext<ICarrinhoContext>({
  adicionarItemCarrinho: () => null,
  removerItemCarrinho: () => null,
  carregando: false
})

const CarrinhoProvider = ({ children }: ICarrinhoProviderProps) => {
  const { data, loading: loadingCarrinho } = useCarrinho()

  const [removerItem] = useRemoverItem();

  const [adicionarItem, { loading: loadingAdiciona }] = useAdicionarItem();

  const adicionarItemCarrinho = (item: IItemCarrinho) => {
    adicionarItem({
      variables: {
        item: {
          livroId: item.livro.id,
          opcaoCompraId: item.opcaoCompra.id,
          quantidade: item.quantidade
        }
      }
    })
  }

  const removerItemCarrinho = (item: IItemCarrinho) => {
    removerItem({
      variables: {
        item: {
          livroId: item.livro.id,
          opcaoCompraId: item.opcaoCompra.id,
          quantidade: item.quantidade
        }
      }
    })
  }

  return (<CarrinhoContext.Provider value={{
    carrinho: data?.carrinho,
    adicionarItemCarrinho,
    removerItemCarrinho,
    carregando: loadingCarrinho || loadingAdiciona
  }}>
    {children}
  </CarrinhoContext.Provider>)

}

export default CarrinhoProvider;