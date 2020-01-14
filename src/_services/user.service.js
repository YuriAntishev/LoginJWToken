import config from 'config';
import { authHeader } from '../_helpers/auth-header.js';
import { handleResponse } from '../_helpers/handle-response.js';

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}