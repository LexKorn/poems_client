import { $authHost } from ".";

export const createAuthor = async (name: string) => {
    const {data} = await $authHost.post('api/authors', {name});
    return data;
};

export const fetchAuthors = async () => {
    const {data} = await $authHost.get('api/authors');
    return data;
};

export const fetchOneAuthor = async (id: number) => {
    const {data} = await $authHost.get('api/authors/' + id);
    return data;
};

export const updateAuthor = async (id: number, name: string) => {
    const {data} = await $authHost.put('api/authors/' + id, {name});
    return data;
};

export const deleteAuthor = async (id: number) => {
    const {data} = await $authHost.delete('api/authors/' + id);
    return data;
};