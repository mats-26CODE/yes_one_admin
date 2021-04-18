import React from 'react';
import './css/Input.css';

const Input = ({
    type,
    placeholder,
    maxLength,
    value,
    onChange,
}) => {
    return (
        <div className={'input__container'}>
            <input
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default Input;
