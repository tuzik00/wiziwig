import {resetBlockWithType, getCurrentBlock} from './blocks';
import {BLOCK_TYPE, HANDLED, NOT_HANDLED} from '../enums';


export const Block = {
  UNSTYLED: 'unstyled',
  PARAGRAPH: 'unstyled',
  OL: 'ordered-list-item',
  UL: 'unordered-list-item',
  H1: 'header-one',
  H2: 'header-two',
  H3: 'header-three',
  H4: 'header-four',
  H5: 'header-five',
  H6: 'header-six',
  CODE: 'code-block',
  BLOCKQUOTE: 'blockquote',
  PULLQUOTE: 'pullquote',
  ATOMIC: 'atomic',
  BLOCKQUOTE_CAPTION: 'block-quote-caption',
  CAPTION: 'caption',
  TODO: 'todo',
  IMAGE: 'atomic:image',
  BREAK: 'atomic:break',
};

export const StringToTypeMap = {
    '--': `${Block.BLOCKQUOTE}:${Block.BLOCKQUOTE_CAPTION}:${Block.CAPTION}`,
    '> ': Block.BLOCKQUOTE,
    '*.': Block.UL,
    '* ': Block.UL,
    '- ': Block.UL,
    '1.': Block.OL,
    '# ': Block.H1,
    '##': Block.H2,
    '==': Block.UNSTYLED,
    '[]': Block.TODO,
};


const beforeInput = (editorState, inputString, onChange, mapping = StringToTypeMap) => {
    console.log(editorState,'wqee')
    const selection = editorState.getSelection();
    const block = getCurrentBlock(editorState);
    const blockType = block.getType();
    if (blockType.indexOf(BLOCK_TYPE.ATOMIC) === 0) {
        return NOT_HANDLED;
    }
    const blockLength = block.getLength();
    if (selection.getAnchorOffset() > 1 || blockLength > 1) {
        return NOT_HANDLED;
    }
    const blockTo = mapping[block.getText()[0] + inputString];
    if (!blockTo) {
        return NOT_HANDLED;
    }
    const finalType = blockTo.split(':');
    if (finalType.length < 1 || finalType.length > 3) {
        return NOT_HANDLED;
    }
    let fType = finalType[0];
    if (finalType.length === 1) {
        if (blockType === finalType[0]) {
            return NOT_HANDLED;
        }
    } else if (finalType.length === 2) {
        if (blockType === finalType[1]) {
            return NOT_HANDLED;
        }
        if (blockType === finalType[0]) {
            fType = finalType[1];
        }
    } else if (finalType.length === 3) {
        if (blockType === finalType[2]) {
            return NOT_HANDLED;
        }
        if (blockType === finalType[0]) {
            fType = finalType[1];
        } else {
            fType = finalType[2];
        }
    }

    onChange(resetBlockWithType(editorState, fType, {text: ''}));

    return HANDLED;
};


export default beforeInput;
