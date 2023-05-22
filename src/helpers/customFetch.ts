
export async function customFetch<T>(url: string, options?: object): Promise<T> {
    const res = await fetch(url, options);
    if (res.ok) {
        console.log(res, 'before result')
        const textJSON = await res.text();
        const result = JSON.parse(textJSON)

        console.log(textJSON, result, 'after result') //to see from vercel
        // const tes = await res.text()
        // console.log(tes,  'tes result') //to see from vercel


        if (result.error) {
            throw new Error(result.error);
        }
        return result;
    }
    throw new Error(`Error ${res.status}: ${res.statusText}`);
}



