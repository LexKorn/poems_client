import {makeAutoObservable} from 'mobx';

import { IPoem, IAuthor } from '../types/types';

export default class LibraryStore {
    _authors: IAuthor[];
    _poems: IPoem[];
    _selectedAuthor: IAuthor;
    _visibleAuthors: IAuthor[];
    _visiblePoems: IPoem[];
    _visibleModal: boolean;
    _toggle: boolean;

    constructor() {
       this._authors = [];
       this._poems = [];
       this._selectedAuthor = {
            id: 0,
            name: '',
            userId: 0,      
        };
       this._visibleAuthors = [];
       this._visiblePoems = [];
       this._visibleModal = false;
       this._toggle = false;

       makeAutoObservable(this); 
    };

    setAuthors(authors: IAuthor[]) {
        this._authors = authors;
    };
    setPoems(poems: IPoem[]) {
        this._poems = poems;
    };
    setSelectedAuthor(author: IAuthor) {
        this._selectedAuthor = author;
    };
    setVisibleAuthors(visibleAuthors: IAuthor[]) {
        this._visibleAuthors = visibleAuthors;
    };
    setVisiblePoems(visiblePoems: IPoem[]) {
        this._visiblePoems = visiblePoems;
    };
    setVisibleModal(bool: boolean) {
        this._visibleModal = bool;
    };
    setToggle(bool: boolean) {
        this._toggle = bool;
    };

    get authors() {
        return this._authors;
    };
    get poems() {
        return this._poems;
    };
    get selectedAuthor() {
        return this._selectedAuthor;
    }
    get visibleAuthors() {
        return this._visibleAuthors;
    };
    get visiblePoems() {
        return this._visiblePoems;
    };
    get toggle() {
        return this._toggle;
    };
    get visibleModal() {
        return this._visibleModal;
    };
};