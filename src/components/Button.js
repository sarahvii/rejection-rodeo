import React from 'react';

const Button = ({ onClick, isSpinning }) => {
  return (
    <button
      className={`button ${isSpinning ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={isSpinning}
    >
      {isSpinning ? 'Patiently waiting...' : 'Submit Application'}
    </button>
  );
};

export default Button;
