export const IMAGE_VIEW_TYPE = {
    NORMAL: 'normal',
    MAIN: 'main',
    FULL_WIDTH: 'full_width',
};

export const LAYOUT_VIEW_TYPE = {
    TWO_COLUMNS: 'two_columns',
    IMAGE: 'image',
};

export const BLOCK_TYPE = {
    MARKDOWN: 'markdown', //data = {content = string}
    IMAGE: 'image', //data = {id = number, description = 'string', view_type = 'IMAGE_VIEW_TYPE', 'img' = 'src'}
    LAYOUT: 'layout', //data = view_type = LAYOUT_VIEW_TYPE
    PRODUCT_CARDS: 'product_cards',
};
