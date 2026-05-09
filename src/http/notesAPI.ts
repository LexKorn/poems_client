import { $authHost } from ".";

export const createNote = async (note: { title: string; content: string; }) => {
    const {data} = await $authHost.post('api/notes', note);
    return data;
};


export const fetchNotes = async () => {
    const {data} = await $authHost.get('api/notes');
    return data;
};

export const fetchOneNote = async (id: string) => {
    const {data} = await $authHost.get('api/notes/' + id);
    return data;
};

export const updateNote = async (id: number, note: { title: string; content: string; }) => {
    const {data} = await $authHost.put('api/notes/' + id, note);
    return data;
};

export const deleteNote = async (id: number) => {
    const {data} = await $authHost.delete('api/notes/' + id);
    return data;
};