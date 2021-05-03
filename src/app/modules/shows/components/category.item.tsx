import Context from '../contexts';
import cx from 'classnames';
import React, { PropsWithChildren } from 'react';
import { IShowSummary } from '../interfaces';

type OwnProps = {
    movie: IShowSummary;
    isCategory: boolean;
    total: number;
    children?: JSX.Element | JSX.Element[];
};

const CategoryItem = (props: PropsWithChildren<OwnProps>) => (
    <Context.Consumer>
        {({ currentSlide, elementRef }) => {
            const { movie } = props;
            const isActive = currentSlide && currentSlide.id === movie.id;

            return (
                <div
                    ref={elementRef}
                    className={cx('item', {
                        'item--open': isActive,
                        item__category: props.isCategory,
                    })}
                >
                    <img src={movie.image.medium} alt="" />
                </div>
            );
        }}
    </Context.Consumer>
);

export default CategoryItem;
