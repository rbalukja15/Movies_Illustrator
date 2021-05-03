import React, { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { labels } from '../show.constants';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from '@material-ui/icons/Close';
import { IShow } from '../interfaces';
import { showActions } from '../show.actions';
import { connect } from 'react-redux';
import { History } from 'history';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { loadState, saveState } from '../utils/local.storage';

type OwnProps = {
    movie: IShow;
    onClose: () => void;
    getShowSummary: (movieId: number) => Promise<IShow>;
    history: History;
};

const Detail = (props: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    const { movie, onClose } = props;

    const handleClick = async (movieId: number) => {
        await props.getShowSummary(movieId);
        props.history.push('/details');
    };

    const handleAddFavorite = async (movieId: number) => {
        const showSummary = await props.getShowSummary(movieId);
        const currentState = loadState();

        currentState[0].data.push(showSummary);
        saveState(currentState);
    };

    return (
        <div className="content">
            <div className="content__area">
                <Grid container className={'container'}>
                    <Grid container>
                        <Grid item xs={4} className={'card-item'}>
                            <Paper variant={'outlined'}>
                                <Typography gutterBottom variant="subtitle2" component="h6">
                                    {movie.show.rating.average ?? labels.NO_DATA}
                                </Typography>
                                <Typography gutterBottom variant="subtitle2" component="h6">
                                    {labels.RATING}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} className={'card-item'}>
                            <Paper variant={'outlined'}>
                                <Typography gutterBottom variant="subtitle2" component="h6">
                                    {movie.show.premiered}
                                </Typography>
                                <Typography gutterBottom variant="subtitle2" component="h6">
                                    {labels.YEAR}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} className={'card-item'}>
                            <Paper variant={'outlined'} className={'paper'}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={async () => await handleClick(movie.show.id)}
                                    endIcon={<ExitToAppIcon />}
                                >
                                    {labels.MORE_INFO}
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4} className={'card-item'}>
                            <Paper variant={'outlined'}>
                                <Typography gutterBottom variant="subtitle2" component="h6">
                                    {movie.show.network ? movie.show.network.name : labels.NO_DATA}
                                </Typography>
                                <Typography gutterBottom variant="subtitle2" component="h6">
                                    {labels.NETWORK}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} className={'card-item'}>
                            <Paper variant={'outlined'}>
                                <Typography gutterBottom variant="subtitle2" component="h6">
                                    {movie.show.network ? movie.show.network.country.code : labels.NO_DATA}
                                </Typography>
                                <Typography gutterBottom variant="subtitle2" component="h6">
                                    {labels.COUNTRY}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} className={'card-item'}>
                            <Paper variant={'outlined'} className={'paper'}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={async () => await handleAddFavorite(movie.show.id)}
                                    endIcon={<ExitToAppIcon />}
                                >
                                    Add to favorites
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <button className="content__close" onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    getShowSummary: showActions.getShowById,
};

export default compose(withRouter, connect(null, mapDispatchToProps))(Detail);
