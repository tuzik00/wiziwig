import {parse} from '@textlint/markdown-to-ast';
import BLOCK_TYPE from '@wiziwig/configs/enums/blockType';


const defaultInlineStyles = {
    Strong: {
        type: 'BOLD',
        symbol: '__'
    },
    Emphasis: {
        type: 'ITALIC',
        symbol: '*'
    }
};

const defaultBlockStyles = {
    List: 'unordered-list-item',
    Header1: 'header-one',
    Header2: 'header-two',
    Header3: 'header-three',
    Header4: 'header-four',
    Header5: 'header-five',
    Header6: 'header-six',
    CodeBlock: 'code-block',
    BlockQuote: 'blockquote'
};

const getBlockStyleForMd = (node, blockStyles) => {
    const style = node.type;
    const ordered = node.ordered;
    const depth = node.depth;
    if (style === 'List' && ordered) {
        return 'ordered-list-item';
    } else if (style === 'Header') {
        return blockStyles[`${style}${depth}`];
    } else if (
        node.type === 'Paragraph' &&
        node.children &&
        node.children[0] &&
        node.children[0].type === 'Image'
    ) {
        return 'atomic';
    } else if (node.type === 'Paragraph' && node.raw && node.raw.match(/^\[\[\s\S+\s.*\S+\s\]\]/)) {
        return 'atomic';
    }
    return blockStyles[style];
};

const joinCodeBlocks = splitMd => {
    const opening = splitMd.indexOf('```');
    const closing = splitMd.indexOf('```', opening + 1);

    if (opening >= 0 && closing >= 0) {
        const codeBlock = splitMd.slice(opening, closing + 1);
        const codeBlockJoined = codeBlock.join('\n');
        const updatedSplitMarkdown = [
            ...splitMd.slice(0, opening),
            codeBlockJoined,
            ...splitMd.slice(closing + 1)
        ];

        return joinCodeBlocks(updatedSplitMarkdown);
    }

    return splitMd;
};

const splitMdBlocks = (md) => {
    const splitMd = md.split('\n');

    const splitMdWithCodeBlocks = joinCodeBlocks(splitMd);

    return splitMdWithCodeBlocks;
};

const parseMdLine = (line, existingEntities, extraStyles = {}) => {
    const inlineStyles = {...defaultInlineStyles, ...extraStyles.inlineStyles};
    const blockStyles = {...defaultBlockStyles, ...extraStyles.blockStyles};

    let text = '';

    const astString = parse(line);
    const inlineStyleRanges = [];
    const entityRanges = [];
    const entityMap = existingEntities;

    const addInlineStyleRange = (offset, length, style) => {
        inlineStyleRanges.push({offset, length, style});
    };

    const getRawLength = children =>
        children.reduce((prev, current) => {
            if (current.value) {
                return prev + current.value.length;
            } else if (current.children && current.children.length) {
                return prev + getRawLength(current.children);
            }

            return prev;
        }, 0);

    const addLink = child => {
        const entityKey = Object.keys(entityMap).length;

        entityMap[entityKey] = {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
                url: child.url
            }
        };

        entityRanges.push({
            key: entityKey,
            length: getRawLength(child.children),
            offset: text.length
        });
    };

    const addImage = child => {
        const entityKey = Object.keys(entityMap).length;
        entityMap[entityKey] = {
            type: 'IMAGE',
            mutability: 'IMMUTABLE',
            data: {
                url: child.url,
                src: child.url,
                fileName: child.alt || ''
            }
        };

        entityRanges.push({
            key: entityKey,
            length: 1,
            offset: text.length
        });
    };

    const addVideo = child => {
        const string = child.raw;

        const url = string.match(/^\[\[\s(?:embed)\s(?:url=(\S+))\s\]\]/)[1];
        const entityKey = Object.keys(entityMap).length;

        entityMap[entityKey] = {
            type: 'draft-js-video-plugin-video',
            mutability: 'IMMUTABLE',
            data: {
                src: url
            }
        };
        entityRanges.push({
            key: entityKey,
            length: 1,
            offset: text.length
        });
    };

    const parseChildren = (child, style) => {
        const videoShortcodeRegEx = /^\[\[\s(?:embed)\s(?:url=(\S+))\s\]\]/;

        switch (child.type) {
            case 'Link':
                addLink(child);
                break;
            case 'Image':
                addImage(child);
                break;
            case 'Paragraph':
                if (videoShortcodeRegEx.test(child.raw)) {
                    addVideo(child);
                }
                break;
            default:
        }

        if (!videoShortcodeRegEx.test(child.raw) && child.children && style) {
            const rawLength = getRawLength(child.children);

            addInlineStyleRange(text.length, rawLength, style.type);

            const newStyle = inlineStyles[child.type];

            child.children.forEach(grandChild => {
                parseChildren(grandChild, newStyle);
            });
        } else if (!videoShortcodeRegEx.test(child.raw) && child.children) {
            const newStyle = inlineStyles[child.type];

            child.children.forEach(grandChild => {
                parseChildren(grandChild, newStyle);
            });
        } else {
            if (style) {
                addInlineStyleRange(text.length, child.value.length, style.type);
            }

            if (inlineStyles[child.type]) {
                addInlineStyleRange(text.length, child.value.length, inlineStyles[child.type].type);
            }

            text = `${text}${
                child.type === 'Image' || videoShortcodeRegEx.test(child.raw) ? ' ' : child.value
            }`;
        }
    };

    astString.children.forEach(child => {
        const style = inlineStyles[child.type];
        parseChildren(child, style);
    });

    let blockStyle = 'unstyled';

    if (astString.children[0]) {
        const style = getBlockStyleForMd(astString.children[0], blockStyles);

        if (style) {
            blockStyle = style;
        }
    }

    return {
        text,
        inlineStyleRanges,
        entityRanges,
        blockStyle,
        entityMap
    };
};


function draftBlock(block) {
    return {
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
        text: block.text || '',
        type: block.type,
        data: block.data
    }
}

function mdToDraftjs(editorBlocks, extraStyles) {
    if (!editorBlocks.length) {
        return {
            blocks: [],
            entityMap: {},
        }
    }

    return editorBlocks.reduce((accum, editorBlock) => {
        switch (editorBlock.type) {
            case BLOCK_TYPE.IMAGE:
            case BLOCK_TYPE.PRODUCT_SLIDER:
            case BLOCK_TYPE.QUESTION:
                accum.blocks.push(draftBlock(editorBlock));

                break;
            case BLOCK_TYPE.MARKDOWN:
                const paragraphs = splitMdBlocks(editorBlock.data);

                paragraphs.forEach((paragraph) => {
                    const result = parseMdLine(paragraph, accum.entityMap, extraStyles);

                    accum.blocks.push({
                        text: result.text,
                        type: result.blockStyle,
                        depth: 0,
                        inlineStyleRanges: result.inlineStyleRanges,
                        entityRanges: result.entityRanges
                    });

                    accum.entityMap = {
                        ...result.entityMap,
                    };
                });

                break;
        }

        return accum;
    }, {
        blocks: [],
        entityMap: {},
    });
}


export default mdToDraftjs;