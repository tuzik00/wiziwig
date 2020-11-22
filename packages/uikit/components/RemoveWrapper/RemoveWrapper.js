import React from 'react';
import './RemoveWrapper.styl';
import IconDustbin from '../svg/dustbin.svg';



const RemoveWrapper = (props) => {
    const {
        children,
        onRemove,
    } = props;

    return (
        <div className={RemoveWrapper.displayName}>
            {children}

            <div
                className={`${RemoveWrapper.displayName}__remove`}
                onClick={onRemove}
            >
                <IconDustbin
                    width={15}
                    height={15}
                    fill={'white'}
                />
            </div>
        </div>
    );
};

RemoveWrapper.displayName = 'RemoveWrapper';

RemoveWrapper.defaultProps = {
    onRemove: () => {},
};

export default RemoveWrapper;