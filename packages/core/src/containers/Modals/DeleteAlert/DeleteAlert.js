import React from 'react';
import Button from '@wiziwig/uikit/components/Button';


const DeleteAlert = (props) => {
    const {
        modal,
    } = props;

    return (
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button
                onClick={modal.ok}
                color={'orange'}
            >
                Ок
            </Button>
            &nbsp;
            <Button
                onClick={modal.close}
                color={'green'}
            >
                Отмена
            </Button>
        </div>
    )
};


export default DeleteAlert;