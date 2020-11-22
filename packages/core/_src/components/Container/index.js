import React, {useCallback} from 'react';
import useEditor from '../../hoocks/useEditor';
import RemoveWrapper from '../RemoveWrapper';


const Container = (props) => {
    const {
        renderBlock
    } = props;

    const {
        state,
        removeBlock,
    } = useEditor();

    const handleRemove = useCallback((id) => {
        removeBlock(id);
    }, []);

    return (
        <div>
            {state.blocks.map((block) => {
                const {
                    component: BlockComponent,
                    props,
                } = renderBlock(block);

                return (
                    <div key={block.id}>
                        <RemoveWrapper onRemove={handleRemove.bind(null, block.id)}>
                            <BlockComponent
                                {...props}
                                id={block.id}
                            />
                        </RemoveWrapper>
                    </div>
                )
            })}
        </div>
    );
};


export default Container;