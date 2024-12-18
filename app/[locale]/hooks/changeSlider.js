import { useState } from 'react';

const useSlider = (sliderToShow, sliderAmount = 4) => {
    const [sliderState, setSliderState] = useState({
        clickAmount: 0,
        transferX: 0,
    });

    const clickAmount = sliderAmount - sliderToShow;

    const changeSlider = (con) => {
        debugger
        const width = 100 / sliderToShow;
        if (con === 1) {
            if (sliderState.clickAmount < clickAmount) {
                setSliderState((prevState) => ({
                    clickAmount: prevState.clickAmount + 1,
                    transferX: prevState.transferX + width,
                }));
            }
        } else if (con === 0) {
            if (sliderState.clickAmount > 0) {
                setSliderState((prevState) => ({
                    clickAmount: prevState.clickAmount - 1,
                    transferX: prevState.transferX - width,
                }));
            }
        }
    };

    function skipSlider(slider) {
        const width = 100 / sliderToShow;
        var coordinate = width * slider;
        setSliderState((prevState) => ({
            clickAmount: slider,
            transferX: coordinate,
        }));
    }

    return { sliderState, changeSlider,  skipSlider};
};

export default useSlider;