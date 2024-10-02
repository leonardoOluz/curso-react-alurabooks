import { Route, Routes } from "react-router-dom"
import Home from "../paginas/Home"
import PaginaBase from "../paginas/PaginaBase"
import MinhaConta from "../paginas/MinhaConta"
import Pedidos from "../paginas/Pedidos"
import Categoria from "../paginas/Categorias"
import DetalhesLivro from "../paginas/DetalhesLivro"
import Carrinho from "../paginas/Carrinho"


const Rotas = () => {
  return (<Routes>
    <Route path="/" element={<PaginaBase />}>
      <Route index element={<Home />} />
      <Route path="minha-conta/" element={<MinhaConta />}>
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="trocas" element={<h1>troca</h1>} />
        <Route path="cupons" element={<h1>cupons</h1>} />
        <Route path="dados" element={<h1>dados</h1>} />
      </Route>
      <Route path="/minha-sacola" element={<Carrinho/>}/>
      <Route path="categorias/:slug" element={<Categoria />} />
      <Route path="livro/:slug" element={<DetalhesLivro />} />
    </Route>
  </Routes>)
}

export default Rotas