import React from 'react';
type ButtonProps = {
  title: string;
  symbol: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ title, symbol }) => {
  return (
    <div>
      <button
        type="submit"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm w-full py-2.5 text-center me-2 mb-2"
      >
        {symbol}
        <span className="ml-1">{title}</span>
      </button>
    </div>
  );
};

export default Button;
