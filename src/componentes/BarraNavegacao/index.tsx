import { Link, useNavigate } from "react-router-dom"
import BotaoNavegacao from "../BotaoNavegacao"
import ModalCadastroUsuario from "../ModalCadastroUsuario"
import logo from './assets/logo.png'
import usuario from './assets/usuario.svg'
import './BarraNavegacao.css'
import ModalLoginUsuario from "../ModalLoginUsuario"
import useObterToken from "../../hooks/useObterToken"
import useLimparToken from "../../hooks/useLimparToken"
import { ICategaria } from "../../interfaces/ICategaria"
import { gql, useQuery } from "@apollo/client"
import { useState } from "react"

const OBTER_CATEGORIAS = gql`
  query ObterCategoria {
  categorias {
    id
    nome
    slug
  }
}
`;

const BarraNavegacao = () => {
  const [modalCadastroAberta, setModalCadastroAberta] = useState(false);
  const [modalLoginAberta, setModalLoginAberta] = useState(false);
  const { data } = useQuery<{ categorias: ICategaria[] }>(OBTER_CATEGORIAS);
  const token = useObterToken();
  const [usuarioEstaLogado, setUsuarioEstaLogado] = useState<boolean>(token() !== null);
  const deslogar = useLimparToken()
  const navegar = useNavigate();
  const aoEfetuarLogin = () => {
    setModalLoginAberta(false)
    setUsuarioEstaLogado(true)
  }
  const deslogarUsuario = () => {
    setUsuarioEstaLogado(false);
    deslogar();
    navegar("/")
  }

  return (<nav className="ab-navbar">
    <h1 className="logo">
      <Link to="/">
        <img className="logo" src={logo} alt="Logo da AluraBooks" />
      </Link>
    </h1>
    <ul className="navegacao">
      <li>
        <a href="#!">Categorias</a>
        <ul className="submenu">
          {data?.categorias.map(categoria => (
            <li key={categoria.id}>
              <Link to={`/categorias/${categoria.slug}`} state={categoria}>
                {categoria.nome}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
    <ul className="acoes">
      {!usuarioEstaLogado && (<>
        <li>
          <BotaoNavegacao
            texto="Login"
            textoAltSrc="Icone representando um usuário"
            imagemSrc={usuario}
            onClick={() => setModalLoginAberta(true)}
          />
          <ModalLoginUsuario
            aberto={modalLoginAberta}
            aoFechar={() => setModalLoginAberta(false)}
            aoClickCadastrar={() => {
              setModalLoginAberta(false)
              setModalCadastroAberta(true)
            }}
            aoEfetuarLogin={aoEfetuarLogin}
          />
        </li>
        <li>
          <BotaoNavegacao
            texto="Cadastrar-se"
            textoAltSrc="Icone representando um usuário"
            imagemSrc={usuario}
            onClick={() => setModalCadastroAberta(true)}
          />
          <ModalCadastroUsuario
            aberta={modalCadastroAberta}
            aoFechar={() => setModalCadastroAberta(false)}
          />
        </li>
      </>)}
      {usuarioEstaLogado && <>
        <li>
          <Link to="/minha-conta/pedidos">Minha conta</Link>
        </li>
        <li>
          <BotaoNavegacao
            texto="Logout"
            textoAltSrc="Icone representando um usuário"
            imagemSrc={usuario}
            onClick={deslogarUsuario}
          />
        </li>
      </>}
    </ul>
  </nav>)
}

export default BarraNavegacao