import BLOCK_TYPE from '@wiziwig/configs/enums/blockType';

import LayoutImage from './containers/Blocks/LayoutImage';
import LayoutColumns from './containers/Blocks/LayoutColumns';
import WidgetNavigations from './containers/Blocks/WidgetNavigations';
import WidgetUser from './containers/Blocks/WidgetUser';
import Question from './containers/EditorBlocks/Question';
import ProductSlider from './containers/EditorBlocks/ProductSlider';


export default (block) => {
    const type = block.getType
        ? block.getType()
        : block.type;

    switch (type) {
        case BLOCK_TYPE.PRODUCT_SLIDER:
            return {
                component: ProductSlider,
                editable: false,
            };

        case BLOCK_TYPE.QUESTION:
            return {
                component: Question,
                editable: false,
            };

        case BLOCK_TYPE.LAYOUT_IMAGE:
            return {
                component: LayoutImage,
            };

        case BLOCK_TYPE.LAYOUT_COLUMNS:
            return {
                component: LayoutColumns,
            };

        case BLOCK_TYPE.WIDGET_NAVIGATION:
            return {
                component: WidgetNavigations,
            };

        case BLOCK_TYPE.WIDGET_USER:
            return {
                component: WidgetUser,
            };

        default:
            return null;
    }
}