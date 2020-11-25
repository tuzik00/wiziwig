export default {
    MARKDOWN: 'markdown', // data = {content = string}
    IMAGE: 'image', // data = {id = number, description = 'string', view_type = 'IMAGE_VIEW_TYPE', 'img' = 'src'}
    LAYOUT_COLUMNS: 'layout:columns', // data = view_type = LAYOUT_VIEW_TYPE
    LAYOUT_COLUMNS_ASIDE: 'layout:columns:aside',
    LAYOUT_COLUMNS_CONTENT: 'layout:columns:content',
    LAYOUT_IMAGE: 'layout:image',
    WIDGET_USER: 'widget:user',
    WIDGET_NAVIGATION: 'widget:navigation',
    PRODUCT_SLIDER: 'product_slider',

    QUESTION: 'question',
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
    BREAK: 'atomic:break',
};

export const HANDLED = 'handled';
export const NOT_HANDLED = 'not_handled';