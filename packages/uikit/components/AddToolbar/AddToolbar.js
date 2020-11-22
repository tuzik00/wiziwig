import React, {useState} from 'react';
import cn from 'classnames';
import IconPlus from '../svg/plus.svg';

import './AddToolbar.styl';


const AddToolbar = (props) => {
    const {
        items,
        onSelect,
        position,
    } = props;

    const [isActive, setActive] = useState(false);

    return (
        <div
            className={cn(AddToolbar.displayName, {
                [`${AddToolbar.displayName}_active`]: isActive,
            })}
            style={{
                left: position.left,
                top: position.top,
            }}
        >
            <div className={cn(`${AddToolbar.displayName}__buttons`)}>
                {items.map((item) => (
                    <div
                        className={cn(`${AddToolbar.displayName}__button`)}
                        onClick={() => onSelect(item)}
                    >
                        {item.title}
                    </div>
                ))}
            </div>

            <div
                className={cn(`${AddToolbar.displayName}__toggle`)}
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
};


AddToolbar.displayName = 'AddToolbar';

AddToolbar.defaultProps = {
    items: [],
    onSelect: () => {},
    position: {
        left: 0,
        top: 0,
    }
};


export default AddToolbar;