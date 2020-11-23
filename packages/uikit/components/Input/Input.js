import React from 'react';
import './Input.styl';


const Input = (props) => {
    const {
        onChange,
        color,
    } = props;

    return (
        <input
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