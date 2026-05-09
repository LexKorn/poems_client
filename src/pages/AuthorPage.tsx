import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Spinner} from 'react-bootstrap';

import AuthorBlock from '../components/AuthorBlock/AuthorBlock';
import Pageup from '../components/Pageup/Pageup';
import { IAuthor, IPoem } from '../types/types';
import { fetchPoems } from '../http/poemsAPI';
import PoemsList from '../components/PoemsList/PoemsList';


const AuthorPage: React.FC = () => {
    const [poems, setPoems] = useState<IPoem[]>([]);
    const [poemsAuthor, setPoemsAuthor] = useState<IAuthor>({} as IAuthor);
    const [loading, setLoading] = useState<boolean>(true);
    const {id} = useParams();

    useEffect(() => {
        fetchPoems().then(data => {
            setPoems(data);
            setLoading(false);
            console.log(`data: ${data}`);
        });
    }, []);

    useEffect(() => {
        if (poems.length) {
            // @ts-ignore
            setPoemsAuthor(poems.filter(poem => poem.authorId === Number(id)).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1));
        }
        console.log(`poems: ${poems}`);
        console.log(`poemsAuthor: ${poemsAuthor}`);
    }, [poems]);

    // console.log(`poems: ${poems[0]}`);
    // console.log(`poemsAuthor: ${poemsAuthor.name}`);


    return (
        <div>
            <AuthorBlock />
            {loading ? <Spinner /> : <PoemsList author={poemsAuthor} />}
            <Pageup />
        </div>
    );
};

export default AuthorPage;