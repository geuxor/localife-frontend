import * as S from './styles'
import Logo from '../../assets/logo.png'
import Burger from './Burger'

type Props = {
  children?: any
}

function Navbar(props: Props) {
  console.log(props.children)

  return (
    <>
      <S.Nav>
        <S.Logo src={Logo} alt="Localife" />
      </S.Nav>
      <Burger />
      {props.children}
    </>
  )
}

export default Navbar
