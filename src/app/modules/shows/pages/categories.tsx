import React, { FunctionComponent, PropsWithChildren, ReactElement, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../shared/store';
import { IShow } from '../interfaces';
import { showActions } from '../show.actions';
import styles from './index.module.scss';
import Slider from '../components/slider';
import { loadState } from '../utils/local.storage';
import { Typography } from '@material-ui/core';

interface OwnProps {
    shows: IShow[];
    getShows: () => Promise<IShow[]>;
}

type Props = OwnProps & ReturnType<typeof mapStateToProps>;

const Categories = (props: PropsWithChildren<Props>): ReactElement<FunctionComponent<Props>> => {
    const [data, setData] = useState([]);
    const { shows } = props;

    useEffect(() => {
        setData(loadState());
    }, []);

    return (
        <div className={styles.wrapper}>
            {data.length &&
                data.map((category, index) => (
                    <Slider key={index}>
                        <Typography component={'h2'} variant={'h5'}>
                            Favorites
                        </Typography>
                        {category.data.map((show, showIndex) => (
                            <Slider.CategoryItem
                                movie={show}
                                key={showIndex}
                                isCategory={true}
                                total={category.data.length}
                            />
                        ))}
                    </Slider>
                ))}
            {data.length &&
                data.map((category, index) => (
                    <Slider key={index}>
                        <Typography component={'h2'} variant={'h5'}>
                            Favorites
                        </Typography>
                        {category.data.map((show, showIndex) => (
                            <Slider.CategoryItem
                                movie={show}
                                key={showIndex}
                                isCategory={true}
                                total={category.data.length}
                            />
                        ))}
                    </Slider>
                ))}
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    shows: state.show.shows,
});

const mapDispatchToProps = {
    getShows: showActions.getShows,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
