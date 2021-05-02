import { IShowActions, IShowState } from './interfaces';
import { showConstants } from './show.constants';

const initialState: IShowState = {
    shows: [],
    showSummary: null,
    loading: false,
};

const showReducer = (state = initialState, action: IShowActions): IShowState => {
    switch (action.type) {
        case showConstants.SHOW_ACTION_TYPES.GET_SHOWS_SUCCESS:
            return {
                ...state,
                shows: action.shows,
                loading: false,
            };
        case showConstants.SHOW_ACTION_TYPES.GET_SHOW_SUMMARY_SUCCESS:
            return {
                ...state,
                showSummary: action.showSummary,
                loading: false,
            };
        case showConstants.SHOW_ACTION_TYPES.GET_SHOWS_REQUEST:
        case showConstants.SHOW_ACTION_TYPES.GET_SHOW_SUMMARY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case showConstants.SHOW_ACTION_TYPES.GET_SHOWS_FAILURE:
        case showConstants.SHOW_ACTION_TYPES.GET_SHOW_SUMMARY_FAILURE:
            return {
                shows: [],
                showSummary: null,
                loading: false,
            };
        default:
            return state;
    }
};

export { showReducer };
