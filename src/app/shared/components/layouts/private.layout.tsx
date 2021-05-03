import React, { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PublicNavbar from '../navBar';
import Footer from '../footer';
import { AppState } from '../../store';
import Home from '../../../modules/shows/pages';
import Categories from '../../../modules/shows/pages/categories';
import MovieDetail from '../../../modules/shows/pages/movie.detail';

type OwnProps = ReturnType<typeof mapStateToProps>;

const PrivateLayout = (props: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    return (
        <div>
            <PublicNavbar>
                <Switch>
                    <Route exact path={'/'} component={Home} />
                    <Route exact path={'/shows'} component={Home} />
                    <Route exact path={'/shows/:id/details'} component={MovieDetail} />
                    <Route exact path={'/categories'} component={Categories} />
                </Switch>
            </PublicNavbar>
            <Footer />
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    loggedIn: state.authentication.loggedIn,
});

export default compose(withRouter, connect(mapStateToProps, null))(PrivateLayout);
