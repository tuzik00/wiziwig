import React, {memo} from 'react';
import Slider from '@wiziwig/uikit/components/Slider';
import CardProduct from '@wiziwig/uikit/components/CardProduct';
import {useEditor} from "../../../components/Editor";
import ControlWrapperCard from "@wiziwig/uikit/components/ControlWrapperCard";


const _ProductSlider = (props) => {
    const {block} = props;
    const {list} = block.getData().toJS();


    const {
        isReadOnly,
        removeBlock,
    } = useEditor({
        block
    });

    return (
        <ControlWrapperCard
            disabled={isReadOnly}
            onDelete={removeBlock}
        >
            <Slider>
                {list.map((item, index) => (
                    <CardProduct
                        key={index}
                        id={item}
                        name={'name'}
                        price={item}
                        description={'Описание'}
                    />
                ))}
            </Slider>
        </ControlWrapperCard>
    )
};


export default memo(_ProductSlider);