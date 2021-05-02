import React, { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../shared/store';
import MovieCard from '../components/movie.card';

type Props = ReturnType<typeof mapStateToProps>;

const MovieDetail = (props: PropsWithChildren<Props>): ReactElement<FunctionComponent<Props>> => {
    return props.movie && <MovieCard showData={props.movie} />;
};

const mapStateToProps = (state: AppState) => ({
    movie: state.show.showSummary,
});

export default connect(mapStateToProps)(MovieDetail);
