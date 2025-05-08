import {request} from "./request";

(async () => {
    try {
        const res = await request({
            url: 'https://jsonplaceholder.typicode.com/broken-endpoint',
            /*url: 'https://jsonplaceholder.typicode.com/posts/1',*/
            method: 'GET',
            maxRetries: 4,
            retryCondition: (error) => {
                if (error instanceof Response) {
                    return error.status >= 500;
                }
                return true;
            }
        });

        console.log('Response:', res);
    } catch (error) {
        console.error('Error:', error);
    }
})();