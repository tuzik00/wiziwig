import React, {memo} from 'react';
import './TwoColumns.styl';


const TwoColumns = (props) => {
    const {
        aside,
        children,
    } = props;

    return (
        <div className={TwoColumns.displayName}>
            <div className={`${TwoColumns.displayName}__content`}>
                {children}
            </div>

            <div className={`${TwoColumns.displayName}__aside`}>
                {aside}
            </div>
        </div>
    )
};

TwoColumns.displayName = 'TwoColumns';

TwoColumns.defaultProps = {};


export default memo(TwoColumns);