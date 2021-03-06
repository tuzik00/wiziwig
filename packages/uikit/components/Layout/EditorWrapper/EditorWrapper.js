import React from 'react';
import './EditorWrapper.styl';


const EditorWrapper = (props) => {
    const {
        children,
    } = props;

    return (
        <div className={EditorWrapper.displayName}>
            {children}
        </div>
    )
};

EditorWrapper.displayName = 'EditorWrapper';

EditorWrapper.defaultProps = {};


export default EditorWrapper;