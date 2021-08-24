import * as S from './styles'
import Logo from '../../assets/logo.png'
import Burger from './Burger'
import { NavLink } from 'react-router-dom'

type Props = {
  children?: any
}

function Navbar(props: Props) {
  console.log(props.children)

  return (
    <>
      <S.Nav>{/* <S.Logo alt="Localife" /> */}</S.Nav>
      <Burger />
      {props.children}
    </>
  )
}

export default Navbar
