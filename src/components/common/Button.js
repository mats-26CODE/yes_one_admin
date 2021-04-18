import React from 'react';
import './css/Button.css';

const Button = ({
    type,
    onClick,
    text,
}) => {
    return (
        <div className={'button__container'}>
            <button
                type={type}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    )
}

export default Button;
