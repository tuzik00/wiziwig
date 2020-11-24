import {BLOCK_TYPE} from './enums';
import LayoutImage from './containers/Blocks/LayoutImage';
import LayoutColumns from './containers/Blocks/LayoutColumns';
import WidgetNavigations from './containers/Blocks/WidgetNavigations';
import WidgetUser from './containers/Blocks/WidgetUser';


export default (block) => {
    const {
        type,
    } = block;

    switch (type) {
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