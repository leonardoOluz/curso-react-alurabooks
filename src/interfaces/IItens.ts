import { ILivro } from "./ILivro";
import { IOpcaoCompra } from "./IOpcaoCompra";

export interface IItemCarrinho {
  quantidade: number;
  opcaoCompra: IOpcaoCompra;
  livro: ILivro;
  __typename?: string
}
