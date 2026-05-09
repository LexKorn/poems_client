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
import { fetchAuthors } from '../http/authorsAPI';


const MainPage: React.FC = observer(() => {
    const {library} = useContext(Context);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [poem, setPoem] = useState<IPoem>({} as IPoem);
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

    // const poems: IPoem[] = [
    //     {
    //         id: 1,
    //         title: "Title 1",
    //         content: "dfsdsc ing333",
    //         html_content: "string string string string333",
    //         userId: 1,
    //         authorId: 1,
    //     },
    //     {
    //         id: 2,
    //         title: "string 22 ",
    //         content: "sFDGDFGV54354Ving string string333",
    //         html_content: "string string string string333",
    //         userId: 1,
    //         authorId: 1,
    //     },
    //     {
    //         id: 3,
    //         title: "Title 333",
    //         content: "stRRTWCC6666 string333",
    //         html_content: "string string string string333",
    //         userId: 2,
    //         authorId: 1,
    //     },
    //     {
    //         id: 4,
    //         title: "string 4",
    //         content: "QQQQQQQQQstrin1111111ing string333",
    //         html_content: "string string string string333",
    //         userId: 1,
    //         authorId: 3,
    //     },
    // ];

    const selectPoem = (item: IPoem) => {
        setPoem(item);
        setVisible(true)
    };

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
            {loading ? <Spinner animation={"border"}/> :
                <List 
                    items={library.visiblePoems} 
                    // items={poems} 
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
            />
        </Container>
    );
});

export default MainPage;