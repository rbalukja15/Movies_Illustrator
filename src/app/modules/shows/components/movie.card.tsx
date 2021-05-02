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
import './Index.scss';
import { labels } from '../show.constants';

interface OwnProps {
    showData: any;
}

const MovieCard = (props: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { showData } = props;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Card className={'card'}>
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
    );
};

export default MovieCard;
