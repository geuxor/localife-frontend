import styled from 'styled-components'

interface INav {
  open: boolean
  href?: string
}

export const StyledBurger = styled.div<INav>`
  overflow: hidden;
  color: white;
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 20;
  display: none;
  font-family: 'Zilla Slab';
  margin-top: 1.5rem;

  @media (max-width: 1200px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    color: white;
    width: 2rem;
    height: 0.25rem;
    background-color: ${(props) => (props.open ? 'black' : 'white')};
    border-radius: 1px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    cursor: pointer;
    &:nth-child(1) {
      transform: ${(props) => (props.open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      transform: ${(props) =>
        props.open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${(props) => (props.open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${(props) => (props.open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`

export const Nav = styled.nav`
  color: white;
  padding-left: 15px;
  font-size: 1.8rem;
  height: 65px;
  display: flex;
  text-decoration: none;
  justify-content: space-between;
  background-color: #263238;
  align-items: center;
  position: relative;
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.1);
  list-style-type: none;

  @media (max-width: 678px) {
    width: 100vw;
  }

  span {
    font-size: 30px;
    @media only screen and (max-width: 600px) {
      font-size: 20px;
      :nth-child(2) {
        font-size: 16px !important;
        margin-top: 0px !important;
      }
    }
  }
`

export const Ul = styled.ul<INav>`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  position: absolute;
  width: 98.5%;
  top: 0;
  right: 20px;
  justify-content: flex-end;
  margin-top: 8px;
  align-items: center;
  font-size: 18px;
  margin-left: 20px;
  color: white;

  a {
    text-decoration: none;
    text-transform: none;
    color: white;
    cursor: pointer;

    &:hover {
      color: #0dadea;
    }
  }

  li {
    color: white;
    padding: 10px 24px;
    text-decoration: none;
    text-transform: none;
    cursor: pointer;
    &:hover {
      color: #de8500;
    }
  }
  @media (max-width: 1200px) {
    flex-flow: column nowrap;
    background-color: #fdfdfdfa;
    position: fixed;
    transform: ${(props) =>
      props.open ? 'translateX(0)' : 'translateX(100%)'};
    top: -16px;
    right: 0;
    height: 100%;
    width: 180px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    z-index: 9;
    justify-content: normal;

    li {
      color: #000;
      margin-right: 34px;

      &:hover {
        color: #0dadea;
      }
    }
  }
`

export const Logo = styled.img`
  margin: 2px;
  width: 124px;
  object-fit: contain;

  @media (max-width: 1250px) {
    margin: 0px;
  }
`

export const LogoUl = styled.img`
  margin: 2px;
  display: none;

  @media (max-width: 1200px) {
    display: flex;
    width: 65px;
    height: 70px;
    object-fit: contain;
  }
`
export const Icon = styled.div`
  width: 100vw;
  height: calc(100vh - 112px);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 650px;
    height: 50px;
    pointer-events: none;
    object-fit: contain;

    @media (prefers-reduced-motion: no-preference) {
      animation: App-logo-spin infinite 20s linear;
    }
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
