import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as reduxBlock from '@wiziwig/redux/modules/blocks';
import Button from '@wiziwig/uikit/components/Button';
import {useModal} from '@wiziwig/uikit/components/Modal';
import IconPlus from '@wiziwig/uikit/components/svg/plus.svg';
import {BLOCK_TYPE} from '../../../../enums';


const AsideBlocks = (props) => {
    const {
        blockId,
        viewType,
    } = props;

    console.log(props);
    const dispatch = useDispatch();

    const asideWidgetsModal = useModal('asideWidgets', {
        onOk(data) {
            dispatch(reduxBlock.actions.addBlockEntities(BLOCK_TYPE.LAYOUT, {
                blockId,
                viewType,
                insetTo: 'aside',
                data: data || {},
            }))
        }
    });

    return (
        <div>
            <div>

            </div>
            <div>
                <Button
                    isBlock
                    color={'green'}
                    onClick={asideWidgetsModal.open}
                >
                    Создать виджет &nbsp; <IconPlus width={10} height={10} fill={'white'}/>
                </Button>
            </div>
        </div>
    );
};


export default AsideBlocks;