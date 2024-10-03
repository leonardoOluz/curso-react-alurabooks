import { IItemCarrinho } from "./IItemCarrinho";

export interface ICarrinho {
  total: number;
  itens: IItemCarrinho[];
  __typename?: string
}
