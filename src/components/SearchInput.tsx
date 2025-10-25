import React, { ChangeEvent } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'lg';
  showSearchIcon?: boolean;
  onSearch?: () => void;
  label?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  disabled = false,
  className = '',
  size,
  showSearchIcon = true,
  onSearch,
  label,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const sizeClass = size ? `form-control-${size}` : '';

  return (
    <div className={`mb-3 ${className}`.trim()}>
      {label && (
        <label className="form-label fw-semibold">{label}</label>
      )}
      <div className="input-group">
        {showSearchIcon && (
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
        )}
        <input
          type="text"
          className={`form-control ${sizeClass}`.trim()}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          onSubmit={onSearch}
          />
        {onSearch && (
          <button
            className="btn btn-primary"
            type="button"
            onClick={onSearch}
            disabled={disabled}
          >
            Search
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;