import React from 'react';
import {EditorBlock, EditorState} from 'draft-js';
import './Image.styl';
import {getCurrentBlock} from '../../utils/blocks';


const focusBlock = (props) => {
    const {block, blockProps} = props;
    const key = block.getKey();
    const currentblock = getCurrentBlock(blockProps.state);

    if (currentblock.getKey() === key) {
        return;
    }

    const newSelection = new SelectionState({
        anchorKey: key,
        focusKey: key,
        anchorOffset: 0,
        focusOffset: 0,
    });

    console.log(EditorState.forceSelection(props, newSelection));
};


const Image = (props) => {
    let {
        src,
        alt,
    } = props;

    if (!src) {
        const {block} = props;
        const data = block.getData();

        src = data.get('src');
    }

    if (src !== null) {
        const extraProps = {};
        extraProps['data-placeholder'] = 'asdasdada ad asd';
        extraProps.className = 'md-block-image-caption--empty';

        return (
            <div className={Image.displayName}>
                <div className="md-block-image-inner-container">
                    <img role="presentation" src={src}/>
                </div>
                <figcaption {...extraProps}>
                    <EditorBlock {...props} />
                </figcaption>
            </div>
        );
    }

    return <EditorBlock {...props}/>;
};


Image.displayName = 'Image';


export default Image;