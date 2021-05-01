import React, { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PublicNavbar from '../navBar';
import Footer from '../footer';
import { AppState } from '../../store';
import Home from '../../../modules/shows/pages';

type OwnProps = ReturnType<typeof mapStateToProps>;

const PrivateLayout = (props: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    return (
        <div>
            <PublicNavbar>
                <Switch>
                    <Route exact path={'/'} component={Home} />
                    <Route exact path={'/home'} component={Home} />
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
