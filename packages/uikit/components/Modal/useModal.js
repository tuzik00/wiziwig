import React, {useEffect, useContext, useState} from 'react';
import uniqueId from 'lodash/uniqueId';
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

    const [id] = useState(() => uniqueId('modal_'));

    useEffect(() => {
        handleInit({
            id,
            name,
            title,
            width,
            height,
            data,
            onOk,
            onClose,
        });
    }, []);

    return {
        isOpen: true || openModals.some((modalName) => modalName === name),
        open() {
            handleOpen(name, id);
        },
        close() {
            handleClose(name)
        }
    }
};


export default useModal;