import React, {memo} from 'react';
import Slider from '@wiziwig/uikit/components/Slider';
import CardProduct from '@wiziwig/uikit/components/CardProduct';


const _ProductSlider = (props) => {
    const {block} = props;
    const list = block.getData().toJS();


    return (
        <Slider>
            {list.map((item) => (
                <CardProduct
                    id={item}
                    name={'name'}
                    price={item}
                    description={'Описание'}
                />
            ))}
        </Slider>
    )
};


export default memo(_ProductSlider);