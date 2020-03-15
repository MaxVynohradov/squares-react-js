import React, { useEffect } from 'react';

const Button = ({ children: text, dynamicStyles, className, handleClick, onMouseLeave }) => {
  
  return (
    <div
      className={`button ${className}`} 
      style={dynamicStyles}
      onClick={handleClick}
      onMouseLeave={onMouseLeave}
    >
      <span>{text}</span>
    </div>
  );
}

export default Button;
