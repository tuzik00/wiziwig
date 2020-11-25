import {convertToRaw} from "draft-js";
import BLOCK_TYPE from '@wiziwig/configs/enums/blockType';


export default (editorState) => {
    const currentContent = editorState.getCurrentContent();
    const {blocks} = convertToRaw(currentContent);

    return blocks.map((block) => {
        if (block.text &&
            [
                BLOCK_TYPE.H1,
                BLOCK_TYPE.H2,
                BLOCK_TYPE.H3,
            ].includes(block.type)
        ) {
            return {
                type: block.type,
                text: block.text,
            }
        }
    }).filter(Boolean);
}