import * as S from './styles'
import Logo from '../../images/localife(1).png'
import Burger from './Burger'
import { NavLink } from 'react-router-dom'
import RightNav from './RightNav'

type Props = {
  children?: any
}

function Navbar(props: Props) {
  return (
    <>
      <S.Logo src={Logo}></S.Logo>
      <Burger />
      {props.children}
    </>
  )
}

export default Navbar
