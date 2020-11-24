import React, {memo, useMemo} from 'react';


const CreateBlocks = (props = {}) => {
    const {
        blockList,
        renderBlockFn,
        renderItem,
    } = props;

    return useMemo(() => {
        return blockList.map((item) => {
            const block = renderBlockFn(item);

            if (!block || !block.component) {
                return null;
            }

            const Component = block.component;

            const comp = (
                <Component
                    key={item.key}
                    blockKey={item.key}
                    {...item.data}
                    {...block.props}
                />
            );

            return renderItem(comp);
        });
    }, [blockList, renderBlockFn]);
};

CreateBlocks.defaultProps = {
    renderItem: item => item,
};


export default memo(CreateBlocks);