import React from 'react'
import './button.css'

const Styles = [
    "btn-none"
]

const Sizes = [
    "",
    "btn-medium",
    "btn-large"
]

const Button = ({children, type, onClick, buttonStyle, buttonSize}) => {
    const checkButtonStyle = Styles.includes(buttonStyle) ? buttonStyle : Styles[0];
    const checkButtonSize = Sizes.includes(buttonSize) ? buttonSize : Sizes[0];

  return (
    <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
        {children}
    </button>
  )
}

export default Button