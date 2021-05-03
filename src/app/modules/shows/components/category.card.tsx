import React, { FunctionComponent, PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    createStyles,
    DialogActions,
    Divider,
    Grid,
    IconButton,
    Paper,
    TextField,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import CategoryIcon from '@material-ui/icons/Category';
import { loadState, saveState } from '../utils/local.storage';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import { alertActions } from '../../../shared/actions/alert.actions';
import { ICategory, IShowSummary } from '../interfaces';
import './Index.scss';
import { labels } from '../show.constants';

interface OwnProps {
    children?: JSX.Element | JSX.Element[];
    showData: IShowSummary;
}

interface DialogTitleProps extends WithStyles<typeof addOrEditDialog> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const addOrEditDialog = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
            borderBottom: '1px solid #7b79795e',
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

const dialogContent = (theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
});

const DialogTitle = withStyles(addOrEditDialog)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6" className={'dialog-title'}>
                {children}
            </Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(dialogContent)(MuiDialogContent);

const CategoryCard = (props: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    const [data, setData] = useState<ICategory[]>(loadState());
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [categoryNameInput, setCategoryNameInput] = useState<string>(null);

    useEffect(() => {
        setData(loadState());
    }, []);

    const handleSubmit = (): void => {
        const categories = [
            ...data,
            {
                label: categoryNameInput,
                data: [],
            },
        ];
        setData(categories);
        saveState(categories);
        setIsDialogOpen(false);
        alertActions.success('Category Added Successfully');
    };

    const addToCategory = (categoryName) => {
        const localState = data;
        const dataIndex = localState.findIndex((category) => category.label === categoryName);

        localState[dataIndex].data.push(props.showData);
        saveState(localState);
    };

    return (
        <>
            <Card className={'card'} style={{ float: 'left', marginLeft: '2rem' }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h4">
                            Add To Category
                        </Typography>
                    </CardContent>
                    <Divider />
                </CardActionArea>
                <CardActions>
                    <Grid container className={'container'}>
                        {data.length &&
                            data.map((category, index) => (
                                <Grid container key={index}>
                                    <Grid item xs={2} className={'card-item'} />
                                    <Grid item xs={8} className={'card-item'} style={{ marginBottom: 2 }}>
                                        <Paper variant={'outlined'}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<CategoryIcon />}
                                                onClick={() => addToCategory(category.label)}
                                                className={'action-button'}
                                            >
                                                {labels.ADD_TO} {category.label}
                                            </Button>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={2} className={'card-item'} />
                                </Grid>
                            ))}
                        <Grid container>
                            <Grid item xs={2} className={'card-item'} />
                            <Grid item xs={8} className={'card-item'}>
                                <Paper className={'paper'} variant={'outlined'}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddCircleOutlineIcon />}
                                        onClick={() => setIsDialogOpen(true)}
                                        className={'action-button'}
                                    >
                                        Create new
                                    </Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={2} className={'card-item'} />
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
            <Dialog
                onClose={() => setIsDialogOpen(false)}
                aria-labelledby="customized-dialog-title"
                open={isDialogOpen}
                maxWidth={'xs'}
                fullWidth={true}
            >
                <DialogTitle id="customized-dialog-title" onClose={() => setIsDialogOpen(false)}>
                    <span>{labels.CREATE_CATEGORY}</span>
                </DialogTitle>

                <DialogContent>
                    <TextField
                        name={'categoryName'}
                        label={'Category Name'}
                        type="text"
                        onChange={(event) => setCategoryNameInput(event.target.value)}
                        value={categoryNameInput}
                        variant={'outlined'}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant={'contained'}
                        color={'secondary'}
                        disabled={!categoryNameInput}
                        onClick={handleSubmit}
                    >
                        {labels.SAVE_CATEGORY}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CategoryCard;
