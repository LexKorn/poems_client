import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Spinner, Button } from 'react-bootstrap';
import {Helmet} from "react-helmet";

import { IAuthor } from '../../types/types';
import { AUTHORS_ROUTE } from '../../utils/consts';
import { deleteAuthor, fetchOneAuthor } from '../../http/authorsAPI';
import { fetchPoems } from '../../http/poemsAPI';
import {Context} from '../../index';
import ModalAuthorUpdate from '../Modals/ModalAuthorUpdate';

import './authorBlock.sass';


const AuthorBlock: React.FunctionComponent = () => {
    // const {service} = useContext(Context);
    const [author, setAuthor] = useState<IAuthor>({} as IAuthor);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(0);
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOneAuthor(Number(id)).then(data => setAuthor(data));
        fetchPoems().then(data => setQuantity(data.filter((item: { authorId: number; }) => item.authorId === Number(id)).length));
        setLoading(false);
    }, []);

    const removeAuthor = () => {
        if (window.confirm('Вы действительно хотите удалить автора? Все стихи, связанные с ним, будут удалены.')) {
            deleteAuthor(author.id);
            navigate(AUTHORS_ROUTE);
        }        
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
                    <Button className="author__button" variant={"outline-primary"} onClick={() => setVisible(true)}>Редактировать</Button>
                    <Button className="author__button" variant={"outline-danger"} onClick={removeAuthor}>Удалить</Button>
                    <Button className="author__button" variant={"outline-success"} >Добавить стихотворение</Button>
            </div>

            <ModalAuthorUpdate
                show={visible} 
                onHide={() => setVisible(false)} 
                author={author}
            />
        </div>
    );
};

export default AuthorBlock;