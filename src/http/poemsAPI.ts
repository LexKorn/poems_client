import { $authHost } from ".";

export const createPoem = async (poem: { title: string; content: string; html_content: string }) => {
    const {data} = await $authHost.post('api/poems', poem);
    return data;
};


export const fetchPoems = async () => {
    const {data} = await $authHost.get('api/poems');
    return data;
};

export const fetchOnePoem = async (id: string | undefined) => {
    const {data} = await $authHost.get('api/poems/' + id);
    return data;
};

export const updatePoem = async (id: number, poem: { title?: string; content?: string; html_content?: string }) => {
    const {data} = await $authHost.put('api/poems/' + id, poem);
    return data;
};

export const deletePoem = async (id: number) => {
    const {data} = await $authHost.delete('api/poems/' + id);
    return data;
};