import {BLOCK_TYPE} from './enums';

import Cards from './components/Cards';
import Text from './components/Text';
import Image from './components/Image';
import TwoColumns from './components/TwoColumns';
import TableContents from './components/TableContents';
import UserCard from './components/UserCard';


const renderBlock = (state) => (block) => {
    let type = null;
    let props = {};

    if (block.getType) {
        type = block.getType();
    } else {
        type = block.type;
        props = block.props;
    }

    switch (type) {
        case BLOCK_TYPE.CARDS:
            return {
                component: Cards,
                props,
            };
        case BLOCK_TYPE.TEXT:
            return {
                component: Text,
                props,
            };
        case BLOCK_TYPE.IMAGE:
            return {
                component: Image,
                props: {
                    state,
                    ...props
                },
            };
        case BLOCK_TYPE.TWO_COLUMNS:
            return {
                component: TwoColumns,
                props,
            };

        case BLOCK_TYPE.ARTICLE_INFO:
            return {
                component: TableContents,
                props,
            };

        case BLOCK_TYPE.USER_CARD:
            return {
                component: UserCard,
                props,
            };
        default:
            return null;
    }
};


export default renderBlock;