import React from 'react';
import Modal, {Provider, useModal} from '@wiziwig/uikit/components/Modal';
import Button from '@wiziwig/uikit/components/Button';


const ModalContent = (props) => {
    return (
        <div>
            {props.modal.test}
            <button onClick={() => props.modal.ok()}>ok</button>
        </div>
    )
};

const Body = () => {
    const modal = useModal('example', {
        data: {
            test: 1,
        },
        onOk(data) {
            console.log('modal', data)
        },
        onCancel() {
            console.log('cancel')
        }
    });

     const modal2 = useModal('example', {
         data: {
             test: 2,
         },
        onOk(data) {
            console.log('modal', data)
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
                modal 1
            </Button>
            &nbsp;
            <Button
                color={'orange'}
                onClick={() => modal2.open()}
            >
                modal 2
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