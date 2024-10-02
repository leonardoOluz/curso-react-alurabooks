import { IItemCarrinho } from "./IItens";

export interface ICarrinho {
  total: number;
  itens: IItemCarrinho[];
  __typename?: string
}
