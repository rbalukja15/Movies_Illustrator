import React, { FunctionComponent, PropsWithChildren, ReactElement, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../shared/store';
import { IShow } from '../interfaces';
import { showActions } from '../show.actions';
import styles from './index.module.scss';
import Slider from '../components/slider';

interface OwnProps {
    shows: IShow[];
    getShows: () => Promise<IShow[]>;
}

type Props = OwnProps & ReturnType<typeof mapStateToProps>;

const Home = (props: PropsWithChildren<Props>): ReactElement<FunctionComponent<Props>> => {
    const { shows } = props;

    const _refresh = useCallback(async () => {
        await props.getShows();
    }, []);

    useEffect(() => {
        (async () => {
            await props.getShows();
        })();
    }, [_refresh]);

    return (
        <div className={styles.wrapper}>
            {shows.length && (
                <Slider>
                    {shows.map((show, index) => (
                        <Slider.Item movie={show} key={index} />
                    ))}
                </Slider>
            )}
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    shows: state.show.shows,
});

const mapDispatchToProps = {
    getShows: showActions.getShows,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
