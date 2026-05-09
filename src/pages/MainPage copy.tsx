import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { Container, Spinner, Button } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import {Helmet} from "react-helmet";

import List from '../components/List/List';
import PoemItem from '../components/PoemItem/PoemItem';
import Statistics from '../components/Statistics/Statistics';
import SearchPanelPoems from '../components/SearchPanel/SearchPanelPoems';
import Pageup from '../components/Pageup/Pageup';
import { IPoem } from '../types/types';
import { Context } from '../index';
import { fetchPoems } from '../http/poemsAPI';
import ModalPoemDetail from '../components/Modals/ModalPoemDetail';
import PoemEditor from '../components/PoemEditor/PoemEditor';
import PoemsStore from '../store/PoemsStore';
import ListItemPoem from '../components/ListItem/ListItem';


const MainPage: React.FC = observer(() => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleEditor, setVisibleEditor] = useState<boolean>(false);
    const [poem, setPoem] = useState<IPoem>({} as IPoem);
    // const [poems, setPoems] = useState<IPoem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const poems: IPoem[] = [
            {
                id: 1,
                title: "string 1",
                content: "string string string string333",
                html_content: "string string string string333",
                userId: 1,
                authorId: 1,
            },
            {
                id: 2,
                title: "string 2 ",
                content: "string string string string333",
                html_content: "string string string string333",
                userId: 1,
                authorId: 1,
            },
            {
                id: 3,
                title: "string 3",
                content: "string string string string333",
                html_content: "string string string string333",
                userId: 2,
                authorId: 1,
            },
            {
                id: 4,
                title: "string 4",
                content: "string string string string333",
                html_content: "string string string string333",
                userId: 1,
                authorId: 3,
            },
        ];

    // useEffect(() => {
    //     fetchPoems()
    //         .then(data => service.setPoems(data))
    //         .catch(err => alert(err.message))

    //     fetchStamps()
    //         .then(data => service.setStamps(data))
    //         .catch(err => alert(err.message));

    //     fetchModels()
    //         .then(data => service.setModels(data))
    //         .catch(err => alert(err.message));

    //     fetchAuthors()
    //         .then(data => service.setAuthors(data))
    //         .catch(err => alert(err.message));

    //     fetchMasters()
    //         .then(data => service.setMasters(data.sort((a: IMaster, b: IMaster) => a.master > b.master ? 1 : -1)))
    //         .catch(err => alert(err.message));

    //     fetchActivities()
    //         .then(data => service.setActivities(data))
    //         .catch(err => alert(err.message))
    //         .finally(() => setLoading(false));
    // }, []);

    // useEffect(() => {
    //     fetchPoems()
    //         .then(data => {
    //             setPoems(data);
    //             setLoading(false);
    //         })
    //         .catch(err => {
    //             alert('Произошла ошибка при загрузке данных с удалённого сервера.');
    //             console.log(JSON.parse(err.request.response).message);
    //         });
    // }, []);

    const handleSave = () => {
        // Обновляем список после сохранения
        fetchPoems()
            .then(data => {
                // setPoems(data);
                setVisible(false);
                setVisibleEditor(false);
            })
            .catch(err => {
                console.error('Ошибка при обновлении списка:', err);
            });
    };

    const selectPoem = (item: IPoem) => {
        setPoem(item);
        PoemsStore.currentPoem = item;
        setVisible(true);
    };

    const openEditor = (item?: IPoem) => {
        if (item) {
            PoemsStore.currentPoem = item; // Устанавливаем для редактирования
        } else {
            PoemsStore.clearCurrentPoem(); // Очищаем для создания нового
        }
        setVisibleEditor(true);
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

            <Statistics />
            <SearchPanelPoems poems={poems} />
            <h1 style={{textAlign: 'center'}}>Список стихотворений:</h1>

            <List 
                items={poems}
                renderItem={(item: IPoem) => 
                    <ListItemPoem
                    //@ts-ignore
                        onClick={(poem) => selectPoem(poem)}
                        onEdit={(poem) => openEditor(poem)} // Добавьте обработчик редактирования
                        item={item} 
                        key={item.id}
                    />
                } 
            />

            <Button variant={"outline-success"} className='poems__btn' onClick={() => openEditor()} >Добавить</Button>

            {/* {loading ? <Spinner animation={"border"}/> :
                <List 
                    // items={service.visiblePoems} 
                    items={poems} 
                    renderItem={(poem: IPoem) => 
                        <PoemItem 
                            poem={poem} 
                            onClick={(poem) => navigate('/poem/' + poem.id)}                         
                            key={poem.id} 
                        />
                    } 
                />
            } */}

            <ModalPoemDetail 
                showPoem={visible} 
                onHidePoem={() => setVisible(false)} 
                poem={poem}
                onEdit={() => {
                    setVisible(false);
                    openEditor(poem);
                }}
                onSave={handleSave}
            />

            {/* Модальное окно редактора */}
            {visibleEditor && (
                <div className="modal-overlay" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1050
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        maxWidth: '800px',
                        width: '90%',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '10px'}}>
                            <button 
                                onClick={() => setVisibleEditor(false)}
                                className="btn btn-close"
                            >
                            </button>
                        </div>
                        
                        <PoemEditor 
                            poem={PoemsStore.currentPoem || {} as IPoem}
                            onSave={handleSave} // ПЕРЕДАЕМ CALLBACK!
                        />
                        
                        <div style={{textAlign: 'center', marginTop: '20px'}}>
                            <button 
                                onClick={() => setVisibleEditor(false)}
                                className="btn btn-secondary"
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Pageup />
        </Container>
    );
});

export default MainPage;