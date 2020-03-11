import React, { useState } from 'react';

const Button = ({ children: text, size, id, initialPosition, className }) => {
  return (
    <div
      class={`button ${className}`} 
      style={{ ...initialPosition, width: size, height: size }}
    >
      <span>{text}</span>
    </div>
  );
}

export default Button;
