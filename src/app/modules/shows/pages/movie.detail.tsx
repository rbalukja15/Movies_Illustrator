import React, { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../shared/store';

interface OwnProps {}

type Props = OwnProps & ReturnType<typeof mapStateToProps>;

const MovieDetail = (props: PropsWithChildren<Props>): ReactElement<FunctionComponent<Props>> => {
    return <div></div>;
};

const mapStateToProps = (state: AppState) => {
    return {};
};

export default connect(mapStateToProps)(MovieDetail);
