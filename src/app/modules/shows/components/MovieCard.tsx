import React, { FunctionComponent, PropsWithChildren, ReactElement, useState } from 'react';
import { IShow } from '../interfaces';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Paper,
    Popover,
    Typography,
} from '@material-ui/core';
import styles from './index.module.scss';
import { labels } from '../show.constants';

interface OwnProps {
    showData: IShow;
}

const MovieCard = (props: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const {
        showData: { show },
    } = props;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Card className={styles.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="200"
                    width="200"
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
                                <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                                    {labels.MORE_INFO}
                                </Button>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <Typography>The content of the Popover.</Typography>
                                </Popover>
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
