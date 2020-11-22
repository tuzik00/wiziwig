/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AtomicBlockUtils
 * @typechecks
 * @flow
 */

'use strict';

import { BlockMapBuilder, CharacterMetadata, ContentBlock, Modifier, EditorState, genKey } from 'draft-js';

import {List, Repeat} from 'immutable';


const AtomicBlockUtils = {
    insertAtomicBlock: function (
        editorState,
        entityKey,
        character,
    ) {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();

        const afterRemoval = Modifier.removeRange(
            contentState,
            selectionState,
            'backward'
        );

        const targetSelection = afterRemoval.getSelectionAfter();
        const afterSplit = Modifier.splitBlock(afterRemoval, targetSelection);
        const insertionTarget = afterSplit.getSelectionAfter();

        const asAtomicBlock = Modifier.setBlockType(
            afterSplit,
            insertionTarget,
            'atomic'
        );

        const charData = CharacterMetadata.create({entity: entityKey});

        const fragmentArray = [
            new ContentBlock({
                key: genKey(),
                type: 'atomic',
                text: character,
                characterList: List(Repeat(charData, character.length)),
            }),
            new ContentBlock({
                key: genKey(),
                type: 'unstyled',
                text: '',
                characterList: List(),
            }),
        ];

        const fragment = BlockMapBuilder.createFromArray(fragmentArray);

        const withAtomicBlock = Modifier.replaceWithFragment(
            asAtomicBlock,
            insertionTarget,
            fragment
        );

        const newContent = withAtomicBlock.merge({
            selectionBefore: selectionState,
            selectionAfter: withAtomicBlock.getSelectionAfter().set('hasFocus', true),
        });

        return EditorState.push(editorState, newContent, 'insert-fragment');
    },
};


export default AtomicBlockUtils