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
import { Typography } from '@material-ui/core';
import CategoryItem from './category.item';

type SliderProps = {
    category?: any;
    children?: JSX.Element[];
    activeSlide?: IShow;
};

type SlideWrapperProps = {
    children?: JSX.Element | JSX.Element[];
};

type SliderButtonProps = {
    type: 'prev' | 'next';
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

const Slider = (props: SliderProps) => {
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
                <Typography component={'h2'} variant={'h5'} style={{ float: 'left' }}>
                    {props.category}
                </Typography>
                <div className={cx('slider', { 'slider--open': currentSlide != null })}>
                    <div ref={containerRef} className="slider__container" {...slideProps}>
                        {children}
                    </div>
                </div>
                {hasPrev && <SlideButton onClick={handlePrev} type="prev" />}
                {hasNext && <SlideButton onClick={handleNext} type="next" />}
            </SliderWrapper>
            {currentSlide && <Detail movie={currentSlide} onClose={handleClose} />}
        </Context.Provider>
    );
};

Slider.Item = Item;
Slider.CategoryItem = CategoryItem;

export default Slider;
