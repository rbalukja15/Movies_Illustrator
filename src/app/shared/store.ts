import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/base.reducer';
import { loadState, saveState } from '../modules/shows/utils/local.storage';
import throttle from 'lodash';

const persistedState = loadState();
const middleWare = [thunkMiddleware];
const composeEnhancers = (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleWare)));

// store.subscribe(() => {
//     saveState({
//         categories: store.getState().show.categories,
//     });
// });

export default store;
