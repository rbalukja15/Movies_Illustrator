import Context from '../contexts';
import cx from 'classnames';
import React from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { IShow } from '../interfaces';

type OwnProps = {
    movie: IShow;
    key: number;
    children?: JSX.Element | JSX.Element[];
};

type DetailsButtonProps = {
    onClick: () => void;
};

const Mark = () => <div className="mark" />;

const ShowDetailsButton = (props: DetailsButtonProps) => {
    const { onClick } = props;
    return (
        <button onClick={onClick} className="show-details-button">
            <span>
                <ArrowDownwardIcon />
            </span>
        </button>
    );
};

const CategoryItem = (props: any) => (
    <Context.Consumer>
        {({ onSelectSlide, currentSlide, elementRef }) => {
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
                    <ShowDetailsButton onClick={() => onSelectSlide(movie)} />
                    {isActive && <Mark />}
                </div>
            );
        }}
    </Context.Consumer>
);

export default CategoryItem;
