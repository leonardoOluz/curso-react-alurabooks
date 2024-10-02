import { useContext } from "react";
import { CarrinhoContext, ICarrinhoContext } from "../carrinho";

export const useCarrinhoContext = () => {
  return useContext<ICarrinhoContext>(CarrinhoContext)
}