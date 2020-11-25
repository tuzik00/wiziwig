import cn from 'classnames';

import '@wiziwig/uikit/components/WiziwigStyles';
import BLOCK_TYPE from '@wiziwig/configs/enums/blockType';


const BASE_BLOCK_CLASS = 'WiziwigStyles';

export default (block) => {
    switch (block.getType()) {
        case BLOCK_TYPE.UNSTYLED:
            return cn(BASE_BLOCK_CLASS, `${BASE_BLOCK_CLASS}__unstyled`);

        case BLOCK_TYPE.QUESTION:
        case BLOCK_TYPE.PRODUCT_SLIDER:
        case BLOCK_TYPE.IMAGE:
            return cn(BASE_BLOCK_CLASS, `${BASE_BLOCK_CLASS}__image`);

        case BLOCK_TYPE.UL:
            return cn(BASE_BLOCK_CLASS, `${BASE_BLOCK_CLASS}__list`);

        default:
            return BASE_BLOCK_CLASS;
    }
};
