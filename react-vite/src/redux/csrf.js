import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
    options.method = options.method || 'GET';

    options.headers = options.headers || {};

    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] =
            options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN')
    }

    const res = await window.fetch(url, options)

    // Only throw an error for network errors or server errors (5xx)
    if (res.status >= 500) throw res;

    // For 4xx errors, we should return the response to handle in our thunks
    return res;
}

// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}
