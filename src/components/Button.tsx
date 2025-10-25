import React from 'react';

interface ButtonProps {
  label: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
  size?: 'sm' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  size,
  disabled = false,
  type = 'button',
  className = '',
  fullWidth = false,
}) => {
  const sizeClass = size ? `btn-${size}` : '';
  const widthClass = fullWidth ? 'w-100' : '';
  
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${sizeClass} ${widthClass} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;