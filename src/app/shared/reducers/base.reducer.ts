import { combineReducers } from 'redux';
import { alertReducer } from './alert.reducer';
import { authenticationReducer } from './auth.reducer';
import { loginReducer } from '../../modules/login/login.reducer';
import { showReducer } from '../../modules/shows/show.reducer';

export default combineReducers({
    alert: alertReducer,
    authentication: authenticationReducer,
    login: loginReducer,
    show: showReducer,
});
