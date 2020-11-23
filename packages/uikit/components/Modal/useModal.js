import React, {useEffect, useContext} from 'react';
import context from './context';


const useModal = (name, props = {}) => {
    const {
        data = {},
        onOk = null,
        onClose = null,
        width,
        height,
        title,
    } = props;

    const {
        openModals,
        handleOpen,
        handleClose,
        handleInit,
    } = useContext(context);

    useEffect(() => {
        handleInit({
            name,
            data,
            onOk,
            onClose,
            width,
            height,
            title,
        });
    }, []);

    return {
        isOpen: openModals.some((modalName) => modalName === name),
        open() {
            handleOpen(name);
        },
        close() {
            handleClose(name)
        }
    }
};


export default useModal;