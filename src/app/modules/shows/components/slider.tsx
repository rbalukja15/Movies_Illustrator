import React, { useState } from 'react';
import cx from 'classnames';
import usePagination from '../hooks/usePagination';
import './Index.scss';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { useSize } from '../hooks/useSize';
import Context from '../contexts';
import Detail from './detail';
import Item from './item';
import { IShow } from '../interfaces';
import CategoryItem from './category.item';

type SliderProps = {
    children: unknown;
    activeSlide?: IShow;
    isCategoryPage?: boolean;
};

type SlideWrapperProps = {
    children?: JSX.Element | JSX.Element[];
};

type SliderButtonProps = {
    type: 'prev' | 'next' | 'prev-category' | 'next-category';
    onClick: () => void;
};

const SliderWrapper = (props: SlideWrapperProps) => {
    const { children } = props;
    return <div className={'slider-wrapper'}>{children}</div>;
};

const SlideButton = (props: SliderButtonProps) => {
    const { onClick, type } = props;
    return (
        <button className={`slide-button slide-button--${type}`} onClick={onClick}>
            <span>
                <ArrowDownwardIcon />
            </span>
        </button>
    );
};

const Slider = (props: SliderProps): JSX.Element => {
    const { activeSlide, children } = props;
    const [currentSlide, setCurrentSlide] = useState<IShow>(activeSlide);
    const { width, elementRef } = useSize();
    const { handlePrev, handleNext, slideProps, containerRef, hasNext, hasPrev } = usePagination(
        width,
        React.Children.count(children),
    );

    const handleSelect = (movie: IShow) => {
        setCurrentSlide(movie);
    };

    const handleClose = () => {
        setCurrentSlide(null);
    };

    const contextValue = {
        onSelectSlide: handleSelect,
        onCloseSlide: handleClose,
        elementRef,
        currentSlide,
    };

    return (
        <Context.Provider value={contextValue}>
            <SliderWrapper>
                <div className={cx('slider', { 'slider--open': currentSlide != null })}>
                    <div ref={containerRef} className="slider__container" {...slideProps}>
                        {children}
                    </div>
                </div>
                {hasPrev && <SlideButton onClick={handlePrev} type={props.isCategoryPage ? 'prev-category' : 'prev'} />}
                {hasNext && <SlideButton onClick={handleNext} type={props.isCategoryPage ? 'next-category' : 'next'} />}
            </SliderWrapper>
            {currentSlide && <Detail movie={currentSlide} onClose={handleClose} />}
        </Context.Provider>
    );
};

Slider.Item = Item;
Slider.CategoryItem = CategoryItem;

export default Slider;
