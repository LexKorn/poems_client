export interface IAuthor {
    id: number;
    name: string;
    userId: number;
};

export interface IPoem {
    id: number;
    title: string;
    content: string;
    html_content: string;
    userId: number;
    authorId: number;
};