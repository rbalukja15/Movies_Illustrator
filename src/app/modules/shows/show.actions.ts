import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import { alertActions } from '../../shared/actions/alert.actions';
import { authActions } from '../../shared/actions/auth.actions';
import { IShow, IShowActions, IShowSummary } from './interfaces';
import showService from './show.service';
import { showConstants } from './show.constants';

function getShows(): (dispatch: Dispatch) => Promise<IShow[] | AxiosError> {
    return (dispatch) => {
        dispatch(request());

        return showService.getShows().then(
            (response: IShow[]) => {
                dispatch(success(response));
                return response;
            },
            (error: AxiosError) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
                dispatch(authActions.logout());
                return error;
            },
        );
    };

    function request(): IShowActions {
        return { type: showConstants.SHOW_ACTION_TYPES.GET_SHOWS_REQUEST };
    }

    function success(response: IShow[]): IShowActions {
        return {
            type: showConstants.SHOW_ACTION_TYPES.GET_SHOWS_SUCCESS,
            shows: response,
        };
    }

    function failure(error: string): IShowActions {
        return { type: showConstants.SHOW_ACTION_TYPES.GET_SHOWS_FAILURE, error };
    }
}

function getShowById(movieId: number): (dispatch: Dispatch) => Promise<IShowSummary | AxiosError> {
    return (dispatch) => {
        dispatch(request());

        return showService.getShowById(movieId).then(
            (response: IShowSummary) => {
                dispatch(success(response));
                return response;
            },
            (error: AxiosError) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
                dispatch(authActions.logout());
                return error;
            },
        );
    };

    function request(): IShowActions {
        return { type: showConstants.SHOW_ACTION_TYPES.GET_SHOW_SUMMARY_REQUEST };
    }

    function success(response: IShowSummary): IShowActions {
        return {
            type: showConstants.SHOW_ACTION_TYPES.GET_SHOW_SUMMARY_SUCCESS,
            showSummary: response,
        };
    }

    function failure(error: string): IShowActions {
        return { type: showConstants.SHOW_ACTION_TYPES.GET_SHOW_SUMMARY_FAILURE, error };
    }
}

export const showActions = {
    getShows,
    getShowById,
};
