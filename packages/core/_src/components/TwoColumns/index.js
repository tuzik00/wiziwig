import React, {useMemo} from 'react';
import cn from 'classnames';
import {BLOCK_TYPE} from '../../enums';
import Text from '../Text';
import './TwoColumns.styl';

import useEditor from '../../hoocks/useEditor';
import renderBlock from "../../renderBlock";


const TwoColumns = (props) => {

    const {
        state,
        setBlockChildren,
    } = useEditor({blockId: props.id});

    const {
        props: {
            children = {},
        } = {},
    } = state;

    const renderComponent = useMemo(() => {
        const render = (child, index) => {
            const block = renderBlock(child);

            if (!block) {
                return null;
            }

            const {
                component: Component,
                props,
            } = block;

            return (
                <Component key={index} {...props}/>
            )
        };

        if (children.length) {
            return children.map(render);
        }

        return render(children);
    }, [children, children.length]);

    return (
        <div className={TwoColumns.displayName}>
            <div className={`${TwoColumns.displayName}__row`}>
                <Text/>
            </div>
            <div className={cn(`${TwoColumns.displayName}__row`, `${TwoColumns.displayName}__row_widgets`)}>
                {renderComponent}
                <div>
                    <button
                    className={`${TwoColumns.displayName}__add-btn`}
                    onClick={() => setBlockChildren(props.id, {
                        type: BLOCK_TYPE.USER_CARD,
                        props: {
                            userId: +new Date,
                            userName: 'Alex'
                        }
                    })}
                >
                    Карточка пользователя
                </button>

                <button
                    className={`${TwoColumns.displayName}__add-btn`}
                    onClick={() => setBlockChildren(props.id, {
                        type: BLOCK_TYPE.ARTICLE_INFO,
                        props: {
                            list: [
                                {anchor: '#heading1', title: 'Title 1'},
                                {anchor: '#heading2', title: 'Title 2'},
                                {anchor: '#heading3', title: 'Title 3'},
                                {anchor: '#heading4', title: 'Title 4'},
                            ]
                        },
                    })}
                >
                    Оглавление
                </button>
                </div>
            </div>
        </div>
    )
};

TwoColumns.displayName = 'TwoColumns';


export default TwoColumns;