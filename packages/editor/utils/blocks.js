import {EditorState, ContentBlock, genKey, SelectionState, Modifier} from 'draft-js';
import {Map, List} from 'immutable';
import {insertNewUnstyledBlock} from 'draftjs-utils';


export const getBlockType = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const blockType = contentState.getBlockForKey(selectionState.getAnchorKey()).getType();

    return blockType;
};

export const getPrevBlock = (editorState) => {
    const content = editorState.getCurrentContent();
    const blockMap = content.getBlockMap();
    const blockKey = getCurrentBlock(editorState).getKey();
    const index = blockMap.keySeq().findIndex(k => k === blockKey);
    const prevBlock = blockMap.toList().toJS()[index - 1];

    if (!prevBlock) {
        return null;
    }

    return blockMap.get(prevBlock.key);
};

export const getCurrentBlock = (editorState) => {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selectionState.getStartKey());

    return block;
};


export const resetBlockWithType = (editorState, newType = 'unstyled', overrides = {}) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const key = selectionState.getStartKey();
    const blockMap = contentState.getBlockMap();
    const block = blockMap.get(key);

    const newBlock = block.mergeDeep(overrides, {
        type: newType,
        data: newType,
    });

    const newContentState = contentState.merge({
        blockMap: blockMap.set(key, newBlock),
        selectionAfter: selectionState.merge({
            anchorOffset: 0,
            focusOffset: 0,
        }),
    });

    return EditorState.push(editorState, newContentState, 'change-block-type');
};

export const addNewBlockAt = (
    editorState,
    pivotBlockKey,
    newBlockType = 'unstyled',
    initialData = {}
) => {
    const content = editorState.getCurrentContent();
    const blockMap = content.getBlockMap();
    const block = blockMap.get(pivotBlockKey);

    if (!block) {
        throw new Error(`The pivot key - ${pivotBlockKey} is not present in blockMap.`);
    }

    const blocksBefore = blockMap.toSeq().takeUntil((v) => (v === block));
    const blocksAfter = blockMap.toSeq().skipUntil((v) => (v === block)).rest();
    const newBlockKey = genKey();

    const newBlock = new ContentBlock({
        key: newBlockKey,
        type: newBlockType,
        text: '',
        characterList: List(),
        depth: 0,
        data: Map(initialData),
    });

    const newBlockMap = blocksBefore.concat(
        [[pivotBlockKey, block], [newBlockKey, newBlock]],
        blocksAfter
    ).toOrderedMap();

    const selection = editorState.getSelection();

    const newContent = content.merge({
        blockMap: newBlockMap,
        selectionBefore: selection,
        selectionAfter: selection.merge({
            anchorKey: newBlockKey,
            anchorOffset: 0,
            focusKey: newBlockKey,
            focusOffset: 0,
            isBackward: false,
        }),
    });

    return EditorState.push(editorState, newContent, 'split-block');
};


export const addNewBlock = (editorState, newType = 'unstyled', initialData = {}) => {
    const selectionState = editorState.getSelection();

    if (!selectionState.isCollapsed()) {
        return editorState;
    }

    const contentState = editorState.getCurrentContent();
    const key = selectionState.getStartKey();
    const blockMap = contentState.getBlockMap();
    const currentBlock = getCurrentBlock(editorState);

    if (!currentBlock) {
        return editorState;
    }

    if (currentBlock.getLength() === 0) {
        if (currentBlock.getType() === newType) {
            return editorState;
        }

        const newBlock = currentBlock.merge({
            type: newType,
            data: initialData,
        });

        const newContentState = contentState.merge({
            blockMap: blockMap.set(key, newBlock),
            selectionAfter: selectionState,
        });

        const newState = EditorState.push(editorState, newContentState, 'change-block-type');

        return insertNewUnstyledBlock(newState);
    }

    return editorState;
};


export const removeBlock = (editorState, block) => {
    if (!block) {
        return editorState;
    }

    const blockKey = block.getKey();
    const content = editorState.getCurrentContent();
    const contentBlock = content.getBlockForKey(blockKey);

    const targetRange = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: contentBlock.getLength(),
    });

    const withoutTeX = Modifier.removeRange(content, targetRange, 'backward');
    const resetBlock = Modifier.setBlockType(
        withoutTeX,
        withoutTeX.getSelectionAfter(),
        'unstyled'
    );

    const newState = EditorState.push(editorState, resetBlock, 'remove-range');

    return EditorState.forceSelection(newState, resetBlock.getSelectionAfter());
};