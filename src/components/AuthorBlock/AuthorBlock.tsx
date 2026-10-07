// src/components/AuthorBlock/AuthorBlock.tsx
import React, {useContext, useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner, Button } from 'react-bootstrap';
import {Helmet} from "react-helmet";

import { IAuthor } from '../../types/types';
import { AUTHORS_ROUTE } from '../../utils/consts';
import { deleteAuthor, fetchOneAuthor } from '../../http/authorsAPI';
import { fetchPoems } from '../../http/poemsAPI';
import {Context} from '../../index';
import ModalAuthorUpdate from '../Modals/ModalAuthorUpdate';
import ModalPoemAdd from '../Modals/ModalPoemAdd'; 

import './authorBlock.sass';

const AuthorBlock: React.FunctionComponent = () => {
    const {library} = useContext(Context);
    const [author, setAuthor] = useState<IAuthor>({} as IAuthor);
    const [loading, setLoading] = useState<boolean>(true);
    const [visibleUpdate, setVisibleUpdate] = useState<boolean>(false);
    const [visibleAddPoem, setVisibleAddPoem] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(0);
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    useEffect(() => {
        const loadAuthorData = async () => {
            setLoading(true);
            try {
                const authorData = await fetchOneAuthor(Number(id));
                setAuthor(authorData);
                const poemsData = await fetchPoems();
                const authorPoemsCount = poemsData.filter(
                    (item: { authorId: number }) => Number(item.authorId) === Number(id)
                ).length;
                setQuantity(authorPoemsCount);
            } catch (error) {
                console.error('Ошибка загрузки:', error);
            } finally {
                setLoading(false);
            }
        };
        
        loadAuthorData();
    }, [id, library.toggle]); 

    const removeAuthor = async () => {
        if (window.confirm('Вы действительно хотите удалить автора? Все стихи, связанные с ним, будут удалены.')) {
            try {
                await deleteAuthor(author.id);
                const updatedAuthors = library.authors.filter(a => a.id !== author.id);
                library.setAuthors(updatedAuthors);
                library.setToggle(!library.toggle); 
                navigate(AUTHORS_ROUTE);
            } catch (error) {
                console.error('Ошибка удаления:', error);
                alert('Не удалось удалить автора');
            }
        }        
    };

    const handlePoemAdded = () => {
        library.setToggle(!library.toggle);
    };

    if (loading) {
        return <Spinner animation={"border"}/>
    }

    return (
        <div>
            <Helmet>
                <title>{`${author.name}`}</title>
                <meta name="description" content={`Страничка ${author.name}`} />
            </Helmet>

            <div className="author">
                <div className="author__name">{author.name}</div>
                <div className="author__description">количество стихотворений: <span>{quantity}</span></div>
                <Button className="author__button" variant={"outline-primary"} onClick={() => setVisibleUpdate(true)}>
                    Редактировать
                </Button>
                <Button className="author__button" variant={"outline-danger"} onClick={removeAuthor}>
                    Удалить
                </Button>
                <Button 
                    className="author__button" 
                    variant={"outline-success"} 
                    onClick={() => setVisibleAddPoem(true)}
                >
                    Добавить стихотворение
                </Button>
            </div>

            <ModalAuthorUpdate
                show={visibleUpdate} 
                onHide={() => setVisibleUpdate(false)} 
                author={author}
            />
            
            <ModalPoemAdd
                show={visibleAddPoem}
                onHide={() => setVisibleAddPoem(false)}
                authorId={author.id}
                onPoemAdded={handlePoemAdded}
            />
        </div>
    );
};

export default AuthorBlock;