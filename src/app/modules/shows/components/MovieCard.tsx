import React, { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { IShow } from '../interfaces';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Paper,
    Typography,
} from '@material-ui/core';
import styles from './index.module.scss';
import { labels } from '../show.constants';

interface OwnProps {
    showData: IShow;
}

const MovieCard = (props: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    const {
        showData: { show },
    } = props;

    return (
        <Card className={styles.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="300"
                    width="300"
                    image={show.image.medium}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {show.name}
                    </Typography>
                </CardContent>
                <Divider />
            </CardActionArea>
            <CardActions>
                <Grid container className={styles.container}>
                    <Grid container>
                        <Grid item xs={4} className={styles.item}>
                            <Paper variant={'outlined'}>
                                <Typography gutterBottom variant="subtitle2" component="h6">
                                    {show.rating.average ?? labels.NO_DATA}
                                </Typography>
                                <Typography gutterBottom variant="subtitle2" component="h6">
                                    {labels.RATING}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} className={styles.item}>
                            <Paper variant={'outlined'}>
                                <Typography gutterBottom variant="subtitle2" component="h6">
                                    {show.premiered}
                                </Typography>
                                <Typography gutterBottom variant="subtitle2" component="h6">
                                    {labels.YEAR}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} className={styles.item}>
                            <Paper variant={'outlined'} className={styles.paper}>
                                {labels.MORE_INFO}
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4} className={styles.item}>
                            <Paper variant={'outlined'}>
                                <Typography gutterBottom variant="subtitle2" component="h6">
                                    {show.network ? show.network.name : labels.NO_DATA}
                                </Typography>
                                <Typography gutterBottom variant="subtitle2" component="h6">
                                    {labels.NETWORK}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} className={styles.item}>
                            <Paper variant={'outlined'}>
                                <Typography gutterBottom variant="subtitle2" component="h6">
                                    {show.network ? show.network.country.code : labels.NO_DATA}
                                </Typography>
                                <Typography gutterBottom variant="subtitle2" component="h6">
                                    {labels.COUNTRY}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} className={styles.item}>
                            <Paper variant={'outlined'} className={styles.paper}>
                                {labels.MOVIE_DATA}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

export default MovieCard;
