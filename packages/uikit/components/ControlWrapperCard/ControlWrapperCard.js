import React from 'react';
import './ControlWrapperCard.styl';
import IconDustbin from '../svg/dustbin.svg';
import IconTools from '../svg/tools.svg';
import cn from 'classnames';


const ControlWrapperCard = (props) => {
    const {
        children,
        onChange,
        onDelete,
        isLeft,
    } = props;

    return (
        <div className={ControlWrapperCard.displayName}>
            {children}

            <div className={cn(`${ControlWrapperCard.displayName}__controls`, {
                [`${ControlWrapperCard.displayName}__controls_left`]: isLeft,
            })}>
                {onChange && (
                    <div
                        className={`${ControlWrapperCard.displayName}__tools`}
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
                        className={`${ControlWrapperCard.displayName}__remove`}
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

ControlWrapperCard.displayName = 'ControlWrapperCard';

ControlWrapperCard.defaultProps = {};

export default ControlWrapperCard;