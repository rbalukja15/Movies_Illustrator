import React, { FunctionComponent, PropsWithChildren, ReactElement, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../shared/store';
import { IShow } from '../interfaces';
import { IFilters, IPagination } from '../../../shared/interfaces';
import { showActions } from '../show.actions';
import MovieCard from '../components/MovieCard';
import { Grid } from '@material-ui/core';
import styles from './index.module.scss';

interface OwnProps {
    shows: IShow[];
    getShows: (pagination: IPagination, searchText?: string, filters?: IFilters) => Promise<IShow[]>;
}

type Props = OwnProps & ReturnType<typeof mapStateToProps>;

const Home = (props: PropsWithChildren<Props>): ReactElement<FunctionComponent<Props>> => {
    const [filters, setFilters] = useState<any>([]);
    const [pagination, setPagination] = useState<IPagination | null>({ paging: true, page: 0, size: 5 });
    const [searchText, setSearchText] = useState<string | null>(null);
    const { shows } = props;

    const _refresh = useCallback(async () => {
        await props.getShows(pagination, searchText, filters);
    }, []);

    useEffect(() => {
        (async () => {
            await props.getShows(pagination, searchText, filters);
        })();
    }, [_refresh]);

    return (
        <div className={styles.wrapper}>
            {shows.length && (
                <Grid container spacing={2} className={styles.container}>
                    {shows.map((show, index) => (
                        <Grid key={index} item className={styles.item}>
                            <MovieCard key={index} showData={show} />
                        </Grid>
                    ))}
                </Grid>
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
