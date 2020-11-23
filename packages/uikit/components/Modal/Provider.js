import React, {useCallback, useState, useMemo} from 'react';
import Context from './context';
import Modal from './Modal';
import Portal from './Portal';


const Provider = (props) => {
    const {
        children,
        modals,
    } = props;

    const [openModals, pushOpenName] = useState([]);

    const handleOpen = useCallback((name) => {
        pushOpenName((names) => {
            return [
                ...names,
                name,
            ];
        });
    }, []);

    const handleClose = useCallback((name) => {
        pushOpenName((names) => {
            return names.filter((modalName) => modalName !== name);
        });
    }, []);

    const handleInit = useCallback((props) => {
        if (!modals[props.name]) {
            return;
        }

        modals[props.name].props = props
    }, []);

    const modalsList = useMemo(() => {
        return Object.keys(modals).map((modalName, index) => {
            const {
                component: Component,
                title,
                props = {},
            } = modals[modalName];

            if (!openModals.includes(modalName)){
                return null;
            }

            return (
                <Modal
                    key={modalName}
                    index={index + 1}
                    isOpen={openModals.includes(modalName)}
                    title={props.title || title}
                    width={props.width}
                    height={props.height}
                    onOk={props.onOk}
                    onClose={() => handleClose(modalName)}
                >
                    <Component
                        modal={{
                            ...(props.data || {}),
                            close: () => {
                                if (props.onClose) {
                                    props.onClose();
                                }

                                handleClose(modalName);
                            },
                            ok: (data) => {
                                if (props.onOk) {
                                    props.onOk(data);
                                }

                                handleClose(modalName);
                            },
                        }}
                    />
                </Modal>
            );
        });
    }, [openModals]);

    return (
        <Context.Provider
            value={{
                openModals,
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