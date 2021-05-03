import { categories } from '../show.constants';
import { ICategory } from '../interfaces';
import { alertActions } from '../../../shared/actions/alert.actions';

export const loadState = (): ICategory[] => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            localStorage.setItem('state', JSON.stringify(categories));
            return categories;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state): void => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        alertActions.error('Could not save state. An error occurred');
    }
};
