import { useState } from 'react';

const useSlider = () => {
    const [sliderState, setSliderState] = useState({
        clickAmount: 0,
        transferX: 0,
    });

    /// con -> left or write
    /// sliderToShow -> number of slides to show
    /// imagesAmount -> Img number in slider
    const changeSlider = (con, sliderToShow, imagesAmount) => {
        const clickAmount = imagesAmount - sliderToShow;
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

    /// sliderToShow -> number of slides to show
    /// sliderIndex -> images index that must shows up
    function skipSlider(sliderIndex, sliderToShow) {
        const width = 100 / sliderToShow;
        var coordinate = width * sliderIndex;
        setSliderState((prevState) => ({
            clickAmount: sliderIndex,
            transferX: coordinate,
        }));
    }
    return { sliderState, changeSlider,  skipSlider};
};

export default useSlider;
