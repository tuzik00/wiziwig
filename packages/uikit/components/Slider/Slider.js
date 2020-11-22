import React, {useRef, useEffect} from 'react';

import Glider from 'glider-js';

import './Slider.styl';


const Slider = (props) => {
    const {
        children,
    } = props;

    const sliderRef = useRef(null);

    useEffect(() => {
        if (!sliderRef.current) {
            return;
        }

        const glider = new Glider(sliderRef.current, {
            slidesToShow: 4,
            slidesToScroll: 'auto',
        });
    }, []);

    return (
        <div
            className={Slider.displayName}
            ref={sliderRef}
        >
            {React.Children.map(children, (child) => (
                <div className={`${Slider.displayName}__item`}>
                    {child}
                </div>
            ))}
        </div>
    )
};


Slider.displayName = 'Slider';

Slider.defaultProps = {};


export default Slider;