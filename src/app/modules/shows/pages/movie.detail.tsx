import React, { FunctionComponent, PropsWithChildren, ReactElement, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../shared/store';
import MovieCard from '../components/movie.card';
import { useParams } from 'react-router-dom';
import { showActions } from '../show.actions';
import { IShowSummary } from '../interfaces';

type Props = { getShowSummary: (movieId: number) => Promise<IShowSummary> } & ReturnType<typeof mapStateToProps>;

const MovieDetail = (props: PropsWithChildren<Props>): ReactElement<FunctionComponent<Props>> => {
    const { id } = useParams();

    const _refresh = useCallback(async () => {
        await props.getShowSummary(id);
    }, [id]);

    useEffect(() => {
        (async () => {
            await props.getShowSummary(id);
        })();
    }, [_refresh]);

    return props.movie && <MovieCard showData={props.movie} />;
};

const mapStateToProps = (state: AppState) => ({
    movie: state.show.showSummary,
});

const mapDispatchToProps = {
    getShowSummary: showActions.getShowById,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
