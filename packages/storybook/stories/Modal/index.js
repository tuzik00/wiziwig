import React from 'react';
import Modal, {Provider, useModal} from '@wiziwig/uikit/components/Modal';
import Button from '@wiziwig/uikit/components/Button';


const ModalContent = (props) => {
    return (
        <div>
            {props.content}
        </div>
    )
};

const Body = () => {
    const modal = useModal('example', {
        onOk() {
            console.log('ok')
        },
        onCancel() {
            console.log('cancel')
        }
    });

    return (
        <div>
            <div>
                modal - {modal.isOpen ? 'Открыт' : 'Закрыт'}
            </div>
            <br/>
            <Button
                color={'orange'}
                onClick={() => modal.open()}
            >
                Открыть
            </Button>
        </div>
    )
};


const modals = {
    example: {
        title: 'Example modal',
        component: ModalContent,
    }
};

const Example = () => {
    return (
        <Provider modals={modals}>
            <Body/>
        </Provider>
    )
};


export default {
    title: 'Modal',
    component: Modal,
}


export {
    Example,
}