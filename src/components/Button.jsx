import React, { useState } from 'react';

const Button = ({ children: text, size, dynamicStyles, className, handleClick, onMouseLeave }) => {
  return (
    <div
      className={`button ${className}`} 
      style={{ ...dynamicStyles, width: size, height: size }}
      onClick={handleClick}
      onMouseLeave={onMouseLeave}
    >
      <span>{text}</span>
    </div>
  );
}

export default Button;
