import {BLOCK_TYPE, LAYOUT_VIEW_TYPE} from './enums';
import TwoColumnsLayout from './containers/Layout/TwoColumns';
import ImageLayout from './containers/Layout/Image';


const renderLayoutViewType = (block) => {
    const {
        data,
    } = block;

    switch (data.viewType) {
        case LAYOUT_VIEW_TYPE.TWO_COLUMNS:
            return {
                component: TwoColumnsLayout,
                props: {
                    ...block.data,
                },
            };

        case LAYOUT_VIEW_TYPE.IMAGE:
            return {
                component: ImageLayout,
                props: {
                    ...block.data,
                },
            };
        default:
            break;
    }
};

export default (block) => {
    const {
        type,
    } = block;

    switch (type) {
        case BLOCK_TYPE.LAYOUT:
            return renderLayoutViewType(block);

        default:
            break;
    }
}