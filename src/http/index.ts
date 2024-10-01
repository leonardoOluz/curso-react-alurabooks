import axios from "axios";
import useObterToken from "../hooks/useObterToken";
// import { history } from "../App";
import { ICategaria } from "../interfaces/ICategaria";
import { ILivro } from "../interfaces/ILivro";
import { IAutor } from "../interfaces/IAutor";
// import { useNavigate } from "react-router-dom";
// const navegar = useNavigate();

const http = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Accept: "application/json",
    Content: "application/json",
  },
});

http.interceptors.request.use(
  function (config) {
    const token = useObterToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token()}`;
    }
    return config;
  },
  function (error) {
    console.log("Erro no interceptors do axios");
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log("Observando o erro de response do interceptors do axios");
    if (error.response?.status === 401) {
      // navegar("/");
    }
    return Promise.reject(error);
  }
);

export default http;

export const obterCategoriaPorSlug = async (
  slug: string
): Promise<ICategaria> => {
  const resposta = await http.get<ICategaria[]>("/categorias", {
    params: {
      slug,
    },
  });

  return resposta.data[0];
};

export const obterPublic = async (slug: string): Promise<ILivro[]> => {
  const resposta = await http.get<ILivro[]>(`/public/${slug}`);
  return resposta.data;
};

export const obterProdutosPorCategoria = async (
  categoria: ICategaria
): Promise<ILivro[]> => {
  const { data } = await http.get<ILivro[]>("/livros", {
    params: {
      categoria: categoria.id,
    },
  });

  return data;
};

export const obterLivroPorSlug = async (
  slug: string
): Promise<ILivro | null> => {
  const { data } = await http.get<ILivro[]>("/livros", {
    params: {
      slug,
    },
  });

  if (data.length === 0) {
    return null;
  }

  return data[0];
};

export const obterAutorPorID = async (autorId: number): Promise<IAutor> => {
  try {
    const { data } = await http.get<IAutor>(`/autores/${autorId}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Erro de requisição");
  }
};
