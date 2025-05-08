export interface RequestConfig extends RequestInit {
    url: string
    maxRetries?: number
    retryCondition?: (error: Error | Response) => boolean
}

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const request = async (config: RequestConfig, retry: number = 1): Promise<any> => {

    const {
        url,
        maxRetries = 3,
        retryCondition = () => true,
        ...fetchOptions
    } = config;

    try {
        const response = await fetch(config.url, fetchOptions);

        if (response.ok) {
            return await response.json();
        } else {
            if (retry < maxRetries && retryCondition(response)) {
                await sleep(1000 * retry);
                console.log(`Retrying... (${retry}/${maxRetries})`);
                return request(config, retry + 1);
            } else {
                throw new Error(`Server Error ${response.status}: ${response.statusText}`);
            }
        }
    } catch (error: any) {
        if (retry < maxRetries && retryCondition(error)) {
            await sleep(1000 * retry);
            console.log(`Retrying... (${retry}/${maxRetries})`);
            return await request(config, retry + 1);
        } else {
            throw new Error(`Request failed after ${maxRetries} retries: ${error}`);
        }
    }
};
