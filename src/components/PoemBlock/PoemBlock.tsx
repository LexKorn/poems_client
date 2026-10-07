import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Spinner, Button } from 'react-bootstrap';
import {Helmet} from "react-helmet";

import { IPoem, IAuthor} from '../../types/types';
import { AUTHOR_ROUTE, MAIN_ROUTE } from '../../utils/consts';
import { fetchOnePoem, deletePoem } from '../../http/poemsAPI';
import { fetchOneAuthor } from '../../http/authorsAPI';

import './poemBlock.sass';

interface PoemBlockProps {
    cost: number;
    activitiesPrice: number;
    authorpartsPrice: number;
};


const PoemBlock: React.FunctionComponent<PoemBlockProps> = ({cost, activitiesPrice, authorpartsPrice}) => {
    const [poem, setPoem] = useState<IPoem>({} as IPoem);
    const [author, setAuthor] = useState<IAuthor>({} as IAuthor);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOnePoem(id)
            .then(data => setPoem(data))
            .catch(err => alert(err.message))
    }, []);

    useEffect(() => {
        if (poem) {
            fetchOneAuthor(poem.authorId).then(data => {
                setAuthor(data);
                setLoading(false);
            });
        }
    }, [poem]);

    const removePoem = () => {
        if (window.confirm('Вы действительно хотите заказ?')) {
            deletePoem(poem.id);
            navigate(MAIN_ROUTE);
        }        
    };

    if (loading) {
        return <Spinner animation={"border"}/>
    }

    return (
        <div>
            <Helmet>
                <title>BLA-BLA-BLA</title>
                <meta name="description" content="BLA-BLA-BLA"/>
            </Helmet>

            <div className="poem">
                <div 
                    className="poem__name"
                    onClick={() => {navigate(AUTHOR_ROUTE + `/${poem.authorId}`)}} 
                >
                    
                </div>
                
                <Button className="poem__button" variant={"outline-primary"} onClick={() => setVisible(true)}>Редактировать</Button>
                <Button className="poem__button" variant={"outline-danger"} onClick={removePoem}>Удалить</Button>
            </div>
        </div>
    );
};

export default PoemBlock;