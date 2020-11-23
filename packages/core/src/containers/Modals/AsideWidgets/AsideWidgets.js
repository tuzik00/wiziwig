import React, {useCallback} from 'react';
import Button from '@wiziwig/uikit/components/Button';
import {useModal} from '@wiziwig/uikit/components/Modal';


const AsideWidgets = (props) => {
    const {
        modal,
    } = props;

    const userCardModal = useModal('userCard', {
        onOk(data) {
            modal.ok({type: 'user', data});
        }
    });

    const handleAddNavigations = useCallback(() => {
        modal.ok({type: 'navigations'})
    }, []);

    return (
        <div>
            <div>
                <Button
                    isBlock
                    color={'blue'}
                    onClick={userCardModal.open}
                >
                    Карточка пользователя
                </Button>
                <br/>
                <Button
                    isBlock
                    onClick={handleAddNavigations}
                    color={'blue'}
                >
                    Навигация
                </Button>
                <br/>
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button
                    onClick={modal.close}
                    color={'green'}
                >
                    Отмена
                </Button>
            </div>
        </div>
    )
};


export default AsideWidgets;