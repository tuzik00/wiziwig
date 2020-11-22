import React from 'react';

import './TableContents.styl';


const TableContents = (props) => {
    const {
        list,
    } = props;

    return (
        <ul className={TableContents.displayName}>
            {list.map((item) => (
                <li>
                    <a href={`#${item.anchor}`}>
                        {item.title}
                    </a>
                </li>
            ))}
        </ul>
    );
};

TableContents.displayName = 'TableContents';


export default TableContents;