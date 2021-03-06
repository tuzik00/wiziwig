import React from 'react';
import './ControlWrapper.styl';
import IconDustbin from '../svg/dustbin.svg';
import IconTools from '../svg/tools.svg';
import cn from 'classnames';


const ControlWrapper = (props) => {
    const {
        children,
        onChange,
        onDelete,
        isLeft,
    } = props;

    return (
        <div className={ControlWrapper.displayName}>
            {children}

            <div className={cn(`${ControlWrapper.displayName}__controls`, {
                [`${ControlWrapper.displayName}__controls_left`]: isLeft,
            })}>
                {onChange && (
                    <div
                        className={`${ControlWrapper.displayName}__tools`}
                        onClick={onChange}
                    >
                        <IconTools
                            width={15}
                            height={15}
                            fill={'white'}
                        />
                    </div>
                )}

                {onDelete && (
                    <div
                        className={`${ControlWrapper.displayName}__remove`}
                        onClick={onDelete}
                    >
                        <IconDustbin
                            width={15}
                            height={15}
                            fill={'white'}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

ControlWrapper.displayName = 'ControlWrapper';

ControlWrapper.defaultProps = {};

export default ControlWrapper;