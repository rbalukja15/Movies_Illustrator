import React, { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import {
    AppBar,
    CssBaseline,
    Drawer,
    Hidden,
    IconButton,
    Toolbar,
    Typography,
    ThemeOptions,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import { AppState } from '../../store';
import { IPublicNavBar } from '../interfaces';
import { muiStyles } from '../../styles/mui.styles';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import { showRoutes } from '../../../modules/shows/show.constants';
import HomeIcon from '@material-ui/icons/Home';

const PublicNavbar = (props: PropsWithChildren<IPublicNavBar>): ReactElement<FunctionComponent<IPublicNavBar>> => {
    const {
        window,
        classes,
        theme,
        location: { pathname },
        children,
    } = props;
    const [mobileOpen, setMobileOpen] = React.useState<boolean | null>(false);
    const [menuListOpen, setMenuListOpen] = React.useState<boolean>(true);
    const [appliedTheme, setAppliedTheme] = React.useState<boolean>(false);
    const icon = !appliedTheme ? <Brightness7Icon /> : <Brightness3Icon />;
    const applyTheme = () =>
        muiStyles.getMuiTheme(
            appliedTheme ? (muiStyles.darkTheme as ThemeOptions) : (muiStyles.lightTheme as ThemeOptions),
        );

    const handleClick = (): void => {
        setMenuListOpen(!menuListOpen);
    };

    const handleDrawerToggle = (): void => {
        setMobileOpen(!mobileOpen);
    };

    const drawer: JSX.Element = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List component="nav" aria-labelledby="nested-list-subheader" className={classes.list}>
                <ListItem
                    component={Link}
                    className={pathname === showRoutes.HOME ? classes.selectedListItem : classes.listItem}
                    to={showRoutes.HOME}
                >
                    <HomeIcon />
                    <ListItemText primary={'Home'} className={classes.listItemText} />
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <MuiThemeProvider theme={applyTheme()}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" noWrap className={classes.typography}>
                            Movie Illustrator
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <Button
                                className={classes.changeThemeButton}
                                startIcon={icon}
                                onClick={() => setAppliedTheme(!appliedTheme)}
                            >
                                Change Theme
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    <React.Fragment>
                        <Hidden smUp implementation="css">
                            <Drawer
                                container={container}
                                variant="temporary"
                                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </React.Fragment>
                </nav>
                <main className={classes.content}>{children}</main>
            </div>
        </MuiThemeProvider>
    );
};

const mapStateToProps = (state: AppState) => ({
    loggedIn: state.authentication.loggedIn,
});

export default compose(
    withRouter,
    withStyles(muiStyles.navBarStyles, { withTheme: true }),
    connect(mapStateToProps, null),
)(PublicNavbar);
