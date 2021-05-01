import { IShowActions, IShowState } from './interfaces';
import { showConstants } from './show.constants';

const initialState: IShowState = {
    shows: [],
    show: null,
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
        case showConstants.SHOW_ACTION_TYPES.GET_SHOWS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case showConstants.SHOW_ACTION_TYPES.GET_SHOWS_FAILURE:
            return {
                shows: [],
                show: null,
                loading: false,
            };
        default:
            return state;
    }
};

export { showReducer };
