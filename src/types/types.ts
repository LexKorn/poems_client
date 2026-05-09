export interface IStamp {
    id: number;
    stamp: string;
    userId: number;
};

export interface IModel {
    id: number;
    model: string;
    userId: number;
};

export interface IAuthor {
    id: number;
    name: string;
    userId: number;
};

export interface IActivity {
    id: number;
    name: string;
    price: number;
    poemId: number;
    userId: number;
};

export interface IAuthorpart {
    id: number;
    name: string;
    price: number;
    poemId: number;
    userId: number;
};

export interface IMaster {
    id: number;
    master: string;
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