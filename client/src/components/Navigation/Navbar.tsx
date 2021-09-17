import * as S from './styles'
import Logo from '../../images/localife(1).png'
import Burger from './Burger'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <NavLink to="/">
        <S.Nav>
          <S.Logo src={Logo}></S.Logo>
        </S.Nav>
      </NavLink>

      <Burger />
    </>
  )
}

export default Navbar
