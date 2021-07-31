import axios from 'axios';
import {api} from './baseURL';

const axiosInstance= axios.create({
    baseURL :api,
    // headers :{
    //     'x-auth-token':  
    // }
});

export default axiosInstance;