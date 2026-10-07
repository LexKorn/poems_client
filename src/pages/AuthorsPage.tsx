import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { Container, Spinner, Button } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import {Helmet} from "react-helmet";

import List from '../components/List/List';
import AuthorItem from '../components/AuthorItem/AuthorItem';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import Pageup from '../components/Pageup/Pageup';
import ModalAuthorAdd from '../components/Modals/ModalAuthorAdd';
import { IAuthor } from '../types/types';
import { Context } from '../index';
import { fetchAuthors } from '../http/authorsAPI';
import { fetchPoems } from '../http/poemsAPI';



const AuthorsPage: React.FC = observer(() => {
    const {library} = useContext(Context);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAuthors()
            .then(data => {
                library.setAuthors(data);
                setAuthors(data);
            })
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));

        fetchPoems()
            .then(data => library.setPoems(data))
            .catch(err => alert(err.message))
    }, []);
    
    return (
        <Container
            style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
        >
            <Helmet>
                <title>Список авторов</title>
                <meta name="description" content="Список авторов" />
            </Helmet>

            <SearchPanel authors={authors} />
            <Button variant={"outline-success"} onClick={() => library.setVisibleModal(true)} >Добавить автора</Button>
            {loading ? <Spinner animation={"border"}/> :
                <List
                    items={library.visibleAuthors}
                    renderItem={(author: IAuthor) => 
                        <AuthorItem 
                            onClick={(author) => navigate('/author/' + author.id)} 
                            author={author}
                            key={author.id} 
                        />
                    } 
                />
            }
            <Pageup />
            <ModalAuthorAdd
                show={library.visibleModal} 
                onHide={() => setVisible(false)}
            />
        </Container>
    );
});

export default AuthorsPage;