import React from 'react';
import './RemoveWrapper.styl';


const RemoveWrapper = (props) => {
    return (
        <div className={RemoveWrapper.displayName}>
            <div
                className={`${RemoveWrapper.displayName}__btn`}
                onClick={props.onRemove}
            >
                X
            </div>
            <div className={`${RemoveWrapper.displayName}__block`}>
                {props.children}
            </div>
        </div>
    )
};


RemoveWrapper.displayName = 'RemoveWrapper';


export default RemoveWrapper;