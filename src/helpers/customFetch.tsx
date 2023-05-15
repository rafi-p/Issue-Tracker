export async function customFetch<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (res.ok) {
        const result = await res.json();

        if (result.error) {
            throw new Error(result.error);
        }
        return result;
    }
    throw new Error(`Error ${res.status}: ${res.statusText}`);
}
