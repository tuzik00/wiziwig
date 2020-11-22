import React, {useState, useCallback} from 'react';
import cn from 'classnames';
import './InlineToolbar.styl';

import useEditor from '../../hoocks/useEditor';
import { BLOCK_TYPE } from '../../enums';


const InlineToolbar = (props) => {
    const {
        onAdd = () => {},
    } = props;

    const editor = useEditor();
    const [isOpen, setOpen] = useState(false);
    const handleAddBlock = useCallback((blockType, props) => {
        editor.addBlock(blockType, props);
        setOpen(false);
    }, []);

    return (
        <div
            className={cn(InlineToolbar.displayName, {
                [`${InlineToolbar.displayName}_open`]: isOpen
            })}
        >
            <div
                className={`${InlineToolbar.displayName}__add-btn`}
                onClick={() => setOpen(!isOpen)}
            >
                +
            </div>
            <div className={cn(`${InlineToolbar.displayName}__menu`)}>
                <button
                    className={`${InlineToolbar.displayName}__menu-btn`}
                    onClick={() => handleAddBlock(BLOCK_TYPE.TWO_COLUMNS)}
                >
                    Две колонки
                </button>

                <button
                    className={`${InlineToolbar.displayName}__menu-btn`}
                    onClick={() => handleAddBlock(BLOCK_TYPE.IMAGE, {
                        src: 'data:image/jpeg;base64,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',
                        alt: '',
                    })}
                >
                    Картинка
                </button>

                <button
                    className={`${InlineToolbar.displayName}__menu-btn`}
                    onClick={() => handleAddBlock(BLOCK_TYPE.TEXT)}
                >
                    Текст
                </button>
            </div>
        </div>
    );
};

InlineToolbar.displayName = 'InlineToolbar';


export default InlineToolbar;