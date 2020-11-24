import React, {useCallback, useState, useMemo} from 'react';
import Context from './context';
import Modal from './Modal';
import Portal from './Portal';


const Provider = (props) => {
    const {
        children,
        modals,
    } = props;

    const [openedModals, setOpenModal] = useState([]);
    const [createdModals, createModal] = useState([]);

    const handleOpen = useCallback((name, id) => {
        setOpenModal((openModals) => {
            return [
                ...openModals,
                {
                    name,
                    id,
                },
            ];
        });
    }, []);

    const handleClose = useCallback((id) => {
        setOpenModal((openedModals) => openedModals.filter((openModal) => openModal.id !== id));
    }, []);

    const handleInit = useCallback((modalProps) => {
        if (!modals[modalProps.name]) {
            return;
        }

        const {
            component,
            title,
        } = modals[modalProps.name];

        createModal((items) => {
            return [
                ...items,
                {
                    component,
                    id: modalProps.id,
                    title: modalProps.title || title,
                    props: modalProps,
                }
            ]
        })
    }, []);


    const modalsList = useMemo(() => {
        return openedModals.map((openedModal, index) => {
            const {
                id,
            } = openedModal;

            const [modal] = createdModals.filter((item) => item.id === id);

            if (!modal) {
                return null;
            }

            const {
                component: Component,
                title,
                props,
            } = modal;

            return (
                <Modal
                    key={id}
                    index={index + 1}
                    isOpen
                    title={title}
                    width={props.width}
                    height={props.height}
                    onOk={props.onOk}
                    onClose={() => handleClose(id)}
                >
                    <Component
                        modal={{
                            ...(props.data || {}),
                            close: () => {
                                if (props.onClose) {
                                    props.onClose();
                                }

                                handleClose(id);
                            },
                            ok: (data) => {
                                if (props.onOk) {
                                    props.onOk(data, props.data);
                                }

                                handleClose(id);
                            },
                        }}
                    />
                </Modal>
            )
        });
    }, [openedModals]);

    return (
        <Context.Provider
            value={{
                openedModals,
                handleOpen,
                handleClose,
                handleInit,
            }}
        >
            {children}

            <Portal>
                {modalsList}
            </Portal>
        </Context.Provider>
    )
};

Provider.displayName = {
    modals: {},
};


export default Provider;