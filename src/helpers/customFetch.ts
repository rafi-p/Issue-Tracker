
import axios from 'axios';

export async function customFetch<T>(url: string, options?: object): Promise<T> {
    const res = await fetch(url, options);
    if (res.ok) {
        // const result = await res.json();
        const result = await res.text();
        console.log(result)

        if (result.error) {
            throw new Error(result.error);
        }
        return result;
    }
    throw new Error(`Error ${res.status}: ${res.statusText}`);
}



