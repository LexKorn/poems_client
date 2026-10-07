import React, {useState, useEffect, useContext} from 'react';
import { Container, Spinner } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import {Helmet} from "react-helmet";

import List from '../components/List/List';
import PoemItem from '../components/PoemItem/PoemItem';
import SearchPanelPoems from '../components/SearchPanel/SearchPanelPoems';
import Pageup from '../components/Pageup/Pageup';
import ModalPoemDetail from '../components/Modals/ModalPoemDetail';
import poemStore from '../store/PoemsStore';
import { IAuthor, IPoem } from '../types/types';
import { Context } from '../index';
import { fetchAuthors } from '../http/authorsAPI';
import { fetchPoems } from '../http/poemsAPI';


const MainPage: React.FC = observer(() => {
    const {library} = useContext(Context);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [poem, setPoem] = useState<IPoem>({} as IPoem);
    const [author, setAuthor] = useState<IAuthor>({} as IAuthor);
    const [poems, setPoems] = useState<IPoem[]>([]);

    useEffect(() => {
        getPoems();
    }, [library.toggle]);

    useEffect(() => {
        fetchAuthors().then(data => library.setAuthors(data));
    }, []);
  
    function getPoems() {
        fetchPoems()
            .then(data => {
                library.setPoems(data);
                setPoems(data);
            })
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    }

    const selectPoem = (item: IPoem) => {
        setPoem(item);
        poemStore.currentPoem = item;
        setVisible(true)
    };

    const handleSave = () => {
        // Обновляем список после сохранения
        fetchPoems()
            .then(data => {
                setPoems(data);
                setVisible(false);
            })
            .catch(err => {
                console.error('Ошибка при обновлении списка:', err);
            });
    };

    if (loading) {
        return <Spinner />
    }

    return (        
        <Container
            style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
        >
            <Helmet>
                <title>Список стихотворений</title>
                <meta name="description" content="Список стихотворений" />
            </Helmet>

            <SearchPanelPoems poems={poems} />
            {loading ? <Spinner animation={"border"}/> :
                <List 
                    items={library.visiblePoems} 
                    renderItem={(poem: IPoem) => 
                        <PoemItem 
                            poem={poem} 
                            onClick={(poem) => selectPoem(poem)}                  
                            key={poem.id} 
                        />
                    } 
                />
            }
            <Pageup />
            <ModalPoemDetail 
                showPoem={visible} 
                onHidePoem={() => setVisible(false)} 
                poem={poem}
                author={author}
                onSave={handleSave}
            />
        </Container>
    );
});

export default MainPage;