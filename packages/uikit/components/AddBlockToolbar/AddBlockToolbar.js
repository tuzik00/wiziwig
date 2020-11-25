import React, {useState, memo} from 'react';
import cn from 'classnames';
import IconPlus from '../svg/plus.svg';

import './AddBlockToolbar.styl';


const AddBlockToolbar = React.forwardRef((props, ref) => {
    const {
        items,
        onSelect,
        position,
    } = props;

    const [isActive, setActive] = useState(false);

    return (
        <div
            ref={ref}
            className={cn(AddBlockToolbar.displayName, {
                [`${AddBlockToolbar.displayName}_active`]: isActive,
            })}
            style={{
                left: position.left,
                top: position.top,
            }}
        >
            <div className={cn(`${AddBlockToolbar.displayName}__buttons`)}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={cn(`${AddBlockToolbar.displayName}__button`)}
                        onClick={() => onSelect(item)}
                    >
                        {item.title}
                    </div>
                ))}
            </div>

            <div
                className={cn(`${AddBlockToolbar.displayName}__toggle`)}
                onClick={() => setActive(!isActive)}
            >
                <IconPlus
                    width={15}
                    height={15}
                    fill={'#fff'}
                />
            </div>
        </div>
    )
});


AddBlockToolbar.displayName = 'AddBlockToolbar';

AddBlockToolbar.defaultProps = {
    items: [],
    onSelect: () => {},
    position: {
        left: 0,
        top: 0,
    }
};


export default memo(AddBlockToolbar);