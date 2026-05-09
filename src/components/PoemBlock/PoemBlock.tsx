import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Spinner, Button } from 'react-bootstrap';
import {Helmet} from "react-helmet";

import { IPoem, IAuthor, IStamp, IModel, IMaster } from '../../types/types';
import { AUTHOR_ROUTE, MAIN_ROUTE } from '../../utils/consts';
import { fetchOnePoem, deletePoem } from '../../http/poemsAPI';
import { fetchOneAuthor } from '../../http/authorsAPI';
import {Context} from '../../index';

import './poemBlock.sass';

interface PoemBlockProps {
    cost: number;
    activitiesPrice: number;
    authorpartsPrice: number;
};


const PoemBlock: React.FunctionComponent<PoemBlockProps> = ({cost, activitiesPrice, authorpartsPrice}) => {
    // const {service} = useContext(Context);
    const [poem, setPoem] = useState<IPoem>({} as IPoem);
    const [author, setAuthor] = useState<IAuthor>({} as IAuthor);
    const [models, setModels] = useState<IModel[]>([]);
    const [modelAuthor, setModelAuthor] = useState<IModel[]>([]);
    const [stamps, setStamps] = useState<IStamp[]>([]);
    const [stampAuthor, setStampAuthor] = useState<IStamp[]>([]);
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
                    {`${stampAuthor.length ? stampAuthor[0].stamp : ''} ${modelAuthor.length ? modelAuthor[0].model : ''}`}
                </div>
                
                <Button className="poem__button" variant={"outline-primary"} onClick={() => setVisible(true)}>Редактировать</Button>
                <Button className="poem__button" variant={"outline-danger"} onClick={removePoem}>Удалить</Button>
            </div>
            
            {/* <ModalPoemUpdate 
                show={visible} 
                onHide={() => setVisible(false)} 
                poem={poem}
            /> */}
        </div>
    );
};

export default PoemBlock;