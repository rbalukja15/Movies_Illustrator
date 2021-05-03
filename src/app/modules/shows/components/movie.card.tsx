import React, { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { labels } from '../show.constants';
import CategoryCard from './category.card';
import { IShowSummary } from '../interfaces';
import './Index.scss';

interface OwnProps {
    showData: IShowSummary;
}

const MovieCard = (props: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    const { showData } = props;

    return (
        <div style={{ display: 'flex' }}>
            <Card className={'card'} style={{ float: 'left' }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h4">
                            {showData.name}
                        </Typography>
                    </CardContent>
                    <Divider />
                </CardActionArea>
                <CardActions>
                    <Grid container className={'container'}>
                        <Grid container>
                            <Grid item xs={4} className={'card-item'}>
                                <Paper variant={'outlined'}>
                                    <Typography gutterBottom variant="subtitle2" component="h6">
                                        {showData.rating.average ?? labels.NO_DATA}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="h6">
                                        {labels.RATING}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} className={'card-item'}>
                                <Paper variant={'outlined'}>
                                    <Typography gutterBottom variant="subtitle2" component="h6">
                                        {showData.premiered}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="h6">
                                        {labels.YEAR}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} className={'card-item'}>
                                <Paper variant={'outlined'} className={'paper'}>
                                    <Typography gutterBottom variant="subtitle2" component="h6">
                                        {showData.language ?? labels.NO_DATA}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="h6">
                                        Language
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} className={'card-item'}>
                                <Paper variant={'outlined'}>
                                    <Typography gutterBottom variant="subtitle2" component="h6">
                                        {showData.network ? showData.network.name : labels.NO_DATA}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="h6">
                                        {labels.NETWORK}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} className={'card-item'}>
                                <Paper variant={'outlined'}>
                                    <Typography gutterBottom variant="subtitle2" component="h6">
                                        {showData.network ? showData.network.country.code : labels.NO_DATA}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="h6">
                                        {labels.COUNTRY}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} className={'card-item'}>
                                <Paper variant={'outlined'}>
                                    <Typography gutterBottom variant="subtitle2" component="h6">
                                        {showData.type ?? labels.NO_DATA}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="h6">
                                        Type
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <div className="content">
                                    <div className="content__area">
                                        <div className="content__area__container">
                                            <div
                                                className="content__description"
                                                dangerouslySetInnerHTML={{ __html: showData.summary }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
            <CategoryCard showData={showData} />
        </div>
    );
};

export default MovieCard;
