import React from 'react'
import styled, { keyframes } from 'styled-components'

const motion = (props) => keyframes`
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  110% {
    transform: scale(0.9);
  }
`

const HeartSpinner = styled.div`
  position: absolute;
  left: 50vw;
  top: 35vh;
  width: 100%
  height: 1064px;
  transform: rotate(0deg);
  transform-origin: 0px 0px;

  i {
    animation: ${(p) => motion(p)} 1.2s infinite
      cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .heart-style {
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
  }
`

const Heart = ({ color, size }) => (
  <HeartSpinner color={color} size={size}>
    <i className="fas fa-heart heart-style"></i>
  </HeartSpinner>
)

Heart.defaultProps = {
  size: '46px',
  color: '#f6eede',
}

export default Heart
