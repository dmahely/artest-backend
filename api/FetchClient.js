const fetch = require('node-fetch');
const isTokenValid = require('../utils/isTokenValid');

class FetchClient {
    constructor({ url, method, headers, body }) {
        const defaultHeaders = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        this.url = url || '';
        this.method = method || 'GET';
        this.headers = { ...defaultHeaders, ...headers };
        this.body = body;
    }

    async fetch() {
        const response = await fetch(this.url, {
            method: this.method,
            headers: this.headers,
            body: this.body,
        });

        try {
            const jsonified = await response.json();
            return jsonified;
        } catch (err) {
            if (!isTokenValid(response)) {
                throw new Error('Authentication error');
            } else {
                console.log(err);
                throw new Error('API error');
            }
        }
    }
}

module.exports = FetchClient;
