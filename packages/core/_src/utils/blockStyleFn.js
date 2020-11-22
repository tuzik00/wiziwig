import { BLOCK_TYPE } from '../enums';

/*
Get custom classnames for each of the different block types supported.
*/

const BASE_BLOCK_CLASS = 'md-block';

export default (block) => {
  switch (block.getType()) {
    case BLOCK_TYPE.BLOCKQUOTE:
      return `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-quote md-RichEditor-blockquote`;
    case BLOCK_TYPE.UNSTYLED:
      return `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-paragraph`;
    case BLOCK_TYPE.ATOMIC:
      return `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-atomic`;
    case BLOCK_TYPE.CAPTION:
      return `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-caption`;
    case BLOCK_TYPE.TODO: {
      const data = block.getData();
      const checkedClass = data.get('checked') === true ?
        `${BASE_BLOCK_CLASS}-todo-checked` : `${BASE_BLOCK_CLASS}-todo-unchecked`;
      let finalClass = `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-paragraph `;
      finalClass += `${BASE_BLOCK_CLASS}-todo ${checkedClass}`;
      return finalClass;
    }
    case BLOCK_TYPE.IMAGE:
      return `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-image`;
    case BLOCK_TYPE.BLOCKQUOTE_CAPTION: {
      const cls = `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-quote`;
      return `${cls} md-RichEditor-blockquote ${BASE_BLOCK_CLASS}-quote-caption`;
    }
    case BLOCK_TYPE.CODE:
      return `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-code-block`;
    default: return BASE_BLOCK_CLASS;
  }
};
