import React, { useState } from 'react';

const Button = ({ children: text, size, initialPosition, className, handleClick }) => {
  return (
    <div
      className={`button ${className}`} 
      style={{ ...initialPosition, width: size, height: size }}
      onClick={handleClick}
    >
      <span>{text}</span>
    </div>
  );
}

export default Button;
