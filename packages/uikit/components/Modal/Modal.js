import React from 'react';
import cn from 'classnames';
import Button from '../Button';

import './Modal.styl';


const Modal = (props) => {
    const {
        title,
        isOpen,
        onClose,
        onOk,
        width,
        height,
        index,
        children,
    } = props;

    return (
        <>
            <div
                className={cn(Modal.displayName, {
                    [`${Modal.displayName}_open`]: isOpen,
                })}
                style={{
                    width,
                    height,
                    zIndex: index * 10,
                }}
            >
                <div className={`${Modal.displayName}__header`}>
                    {title}
                </div>

                <div className={`${Modal.displayName}__body`}>
                    {children}
                </div>

                <div className={`${Modal.displayName}__actions`}>
                    {onOk && (
                        <Button
                            onClick={onOk}
                            color={'orange'}
                        >
                            Применить
                        </Button>
                    )}

                    {onClose && (
                        <>
                            &nbsp;
                            <Button
                                onClick={onClose}
                                color={'green'}
                            >
                                Отмена
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {isOpen && (
                <div
                    className={'Overlay'}
                    onClick={onClose}
                    style={{
                        zIndex: (index * 10) - 1
                    }}
                />
            )}
        </>
    )
};

Modal.displayName = 'Modal';

Modal.defaultProps = {
    isOpen: false,
    index: 1,
};

export default Modal;