import { makeVar } from "@apollo/client";
import { ILivro } from "../../interfaces/ILivro";
import { IFiltroLivros } from "../../interfaces/IFiltroLivros";

export const filtroLivrosVar = makeVar<IFiltroLivros>({});

export const livrosVar = makeVar<ILivro[]>([]);