import axios from 'axios';

const configs = {
    baseURL: 'localhost',
    timeout: 5000,
    headers: {
        accept: '*/*',
        'Content-Type': 'application/json'
    }
};

const srv = axios.create(configs);
export default srv;
