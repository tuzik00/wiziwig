export const IMAGE_VIEW_TYPE = {
    NORMAL: 'normal',
    MAIN: 'main',
    FULL_WIDTH: 'full_width',
};

export const BLOCK_TYPE = {
    MARKDOWN: 'markdown', // data = {content = string}
    IMAGE: 'image', // data = {id = number, description = 'string', view_type = 'IMAGE_VIEW_TYPE', 'img' = 'src'}
    LAYOUT_COLUMNS: 'layout:columns', // data = view_type = LAYOUT_VIEW_TYPE
    LAYOUT_COLUMNS_ASIDE: 'layout:columns:aside',
    LAYOUT_COLUMNS_CONTENT: 'layout:columns:content',
    LAYOUT_IMAGE: 'layout:image',
    WIDGET_USER: 'widget:user',
    WIDGET_NAVIGATION: 'widget:navigation',
};
