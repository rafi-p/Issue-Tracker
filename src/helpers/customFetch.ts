
import axios from 'axios';

export async function customFetch<T>(url: string, options?: object): Promise<T> {
    // const res = await fetch(url, options);
    // if (res.ok) {
    //     const result = await res.json();

    //     if (result.error) {
    //         throw new Error(result.error);
    //     }
    //     return result;
    // }
    // throw new Error(`Error ${res.status}: ${res.statusText}`);

    // const res = await fetch(url, options);
    let custom = {...options}
    if(options?.body) {
        custom.data = options?.body
        delete custom["body"]
    }
    const res = await axios({
        url,
        ...custom
    })

    if (res.status === 200) {
        return res.data;
    }
    throw new Error(`Error ${res.status}: ${res.statusText}`);
}



