import { createContext } from "react";
import { ICarrinho } from "../../interfaces/ICarrinho";

export interface ICarrinhoContext {
    carrinho?: ICarrinho
}

interface ICarrinhoProviderProps {
    children: React.ReactNode
}

export const CarrinhoContext = createContext<ICarrinhoContext>({})

const CarrinhoProvider = ({ children }: ICarrinhoProviderProps) => {
    const carrinho: ICarrinho = {
        itens: [],
        total: 0
    }

    return (<CarrinhoContext.Provider value={{ carrinho }}>
        {children}
    </CarrinhoContext.Provider>)

}

export default CarrinhoProvider;