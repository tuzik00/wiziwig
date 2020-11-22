import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import './FlyToolbar.styl';
import {getSelection, getSelectionRect} from "../../utils/selection";


const FlyToolbar = (props) => {
    const {
        isVisible = false,
        onChange = () => {},
        onChangeBlock = () => {},
    } = props;

    const toolbarRef = useRef(null);

    useEffect(() => {
        if (!isVisible) {
            return;
        }

        const nativeSelection = getSelection(window);

        if (!nativeSelection.rangeCount) {
            return;
        }

        const selectionBoundary = getSelectionRect(nativeSelection);
        const toolbarNode = toolbarRef.current;
        const toolbarBoundary = toolbarNode.getBoundingClientRect();
        const parent = toolbarRef.current.parentNode;
        const parentBoundary = parent.getBoundingClientRect();

        toolbarNode.style.top = `${(selectionBoundary.top - parentBoundary.top - toolbarBoundary.height - 5)}px`;

        const selectionCenter = (selectionBoundary.left + (selectionBoundary.width / 2)) - parentBoundary.left;
        let left = selectionCenter - (toolbarBoundary.width / 2);
        const screenLeft = parentBoundary.left + left;

        if (screenLeft < 0) {
            left = -parentBoundary.left;
        }

        toolbarNode.style.left = `${left}px`;
    }, [isVisible]);

    return (
        <div
            ref={toolbarRef}
            className={cn(FlyToolbar.displayName, {
                [`${FlyToolbar.displayName}_isVisible`]: isVisible,
            })}
        >
            <button
                onClick={() => onChangeBlock('header-one')}
            >
                Heading 1
            </button>
            <button
                onClick={() => onChange('BOLD')}
            >
                Bold
            </button>
            <button
                onClick={() => onChange('ITALIC')}
            >
                Italic
            </button>
        </div>
    )
};

FlyToolbar.displayName = 'FlyToolbar';


export default FlyToolbar;

