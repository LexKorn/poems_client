import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import {Spinner} from 'react-bootstrap';
import {observer} from 'mobx-react-lite';

import AuthorBlock from '../components/AuthorBlock/AuthorBlock';
import PoemsList from '../components/PoemsList/PoemsList';
import Pageup from '../components/Pageup/Pageup';
import { IAuthor, IPoem } from '../types/types';
import { fetchPoems } from '../http/poemsAPI';
import { fetchAuthors } from '../http/authorsAPI';
import { Context } from '../index';

const AuthorPage: React.FC = observer(() => {
    const {library} = useContext(Context);
    const [loading, setLoading] = useState<boolean>(true);
    const [authorPoems, setAuthorPoems] = useState<IPoem[]>([]);
    const [author, setAuthor] = useState<IAuthor>({} as IAuthor);
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        let cancelled = false;

        const loadData = async () => {
            setLoading(true);
            try {
                const [authorsData, poemsData] = await Promise.all([
                    fetchAuthors(),
                    fetchPoems(),
                ]);
        
                const numericId = Number(id);
                library.setAuthors(authorsData);
        
                const currentAuthor = authorsData.find(
                    (a: IAuthor) => a.id === numericId
                );
                setAuthor(currentAuthor || ({} as IAuthor));
        
                library.setPoems(poemsData);
        
                const filtered = poemsData.filter(
                    (poem: IPoem) => Number(poem.authorId) === numericId
                );
                setAuthorPoems(filtered);
            } catch (error) {
                console.error('Ошибка загрузки:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();

        return () => { cancelled = true; };
    }, [id, library.toggle]);

    return (
        <div>
            <AuthorBlock />
            {loading ? 
                <Spinner animation="border" /> : 
                <PoemsList authorPoems={authorPoems} author={author} />
            }
            <Pageup />
        </div>
    );
});

export default AuthorPage;