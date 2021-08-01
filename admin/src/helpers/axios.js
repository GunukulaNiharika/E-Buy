import axios from 'axios';
import {api} from './baseURL';

const token=window.localStorage.getItem('token');

const axiosInstance= axios.create({
    baseURL :api,
    headers :{
        'Authorization':  token ? `${token}` : ''
    }
});

export default axiosInstance;