import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Interceptor from '../../shared/utils/axios.interceptor';
import { routeConstants } from '../../shared/constants/route.constants';
import { headers } from '../../shared/utils/headers';
import { IShow } from './interfaces';
import { showEndpoints } from './show.endpoints';

axios.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.getItem('token');

    return config;
});
axios.interceptors.response.use((response) => {
    return response;
}, Interceptor(axios));

const getShows = async (): Promise<IShow[] | AxiosError> => {
    const requestOptions: AxiosRequestConfig = {
        url: showEndpoints.GET_SHOWS,
        method: routeConstants.METHODS.GET,
        headers: headers.authHeader(),
    };

    const response = await axios(requestOptions);

    return response.data;
};

const getShowById = async (movieId: number): Promise<IShow | AxiosError> => {
    const requestOptions: AxiosRequestConfig = {
        url: showEndpoints.GET_SHOW_SUMMARY + `/${movieId}`,
        method: routeConstants.METHODS.GET,
        headers: headers.authHeader(),
    };

    const response = await axios(requestOptions);

    return response.data;
};

const showService = {
    getShows,
    getShowById,
};

export default showService;
