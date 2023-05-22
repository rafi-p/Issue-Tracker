
export async function customFetch<T>(url: string, options?: object): Promise<T> {
    const res = await fetch(url, options);
    if (res.ok) {
        // console.log(res, 'before result')
        // const result = await res.json();
        return res.json()
        .then((data) => data)
        .catch(err => console.error(err))

        // console.log(result, 'after result') //to see from vercel
        // const tes = await res
        // console.log(tes,  'tes result') //to see from vercel


        // if (result.error) {
        //     throw new Error(result.error);
        // }
        // return result;
    }
    throw new Error(`Error ${res.status}: ${res.statusText}`);
}



