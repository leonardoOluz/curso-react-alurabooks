import { createContext } from "react";
import { ICarrinho } from "../../interfaces/ICarrinho";
import { useAdicionarItem, useCarrinho } from "../../Graphql/carrinho/hooks";
import { IItemCarrinho } from "../../interfaces/IItemCarrinho";

export interface ICarrinhoContext {
  carrinho?: ICarrinho
  adicionarItemCarrinho: (item: IItemCarrinho) => void
}

interface ICarrinhoProviderProps {
  children: React.ReactNode
}

export const CarrinhoContext = createContext<ICarrinhoContext>({
  adicionarItemCarrinho: () => null
})

const CarrinhoProvider = ({ children }: ICarrinhoProviderProps) => {
  const { data } = useCarrinho()

  const [adicionarItem] = useAdicionarItem();

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

  return (<CarrinhoContext.Provider value={{ carrinho: data?.carrinho, adicionarItemCarrinho }}>
    {children}
  </CarrinhoContext.Provider>)

}

export default CarrinhoProvider;