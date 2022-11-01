import { getToken } from "./auth";

export const requester = (url, method, data) => {
    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: data ? JSON.stringify(data) : null
    });
};