import React from 'react';
import './Input.styl';


const Input = (props) => {
    const {
        onChange,
        placeholder,
        value,
    } = props;

    return (
        <input
            placeholder={placeholder}
            value={value}
            type="text"
            className={Input.displayName}
            onInput={onChange}
        />
    )
};

Input.displayName = 'Input';

Input.defaultProps = {
    onChange: () => {},
};


export default Input;