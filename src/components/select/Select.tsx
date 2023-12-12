import React, { FC } from 'react';
import './Select.scss';
import classNames from 'classnames';

export interface Option<Type = any> {
  label: string;
  value: Type;
}

interface SelectProps {
  value: Option;
  onChange: (newOption: Option) => void;
  options: Option[];
  style?: React.CSSProperties;
}

const Select: FC<SelectProps> = ({ value, onChange, options, style }) => {
  const handleOptionClick = (newOption: Option) => {
    onChange(newOption);
  };

  return (
    <div className="select" style={style}>
      {options.map((option) => (
        <div className="select-item" key={option.value}>
          <span
            className={classNames({ 'select-item__label': true, 'select-item__label--checked': option.value === value.value })}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Select;
