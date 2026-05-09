import React, {useState, useEffect, useContext} from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { IPoem, IAuthor } from '../../types/types';
import { fetchPoems } from '../../http/poemsAPI';
import { Context } from '../..';
import ModalPoemDetail from '../Modals/ModalPoemDetail';
import List from '../List/List';
import PoemItem from '../PoemItem/PoemItem';
// import ModalPoemAdd from '../Modals/ModalPoemAdd';

import './poemsList.sass';

interface PoemsListProps {
    author: IAuthor;
};


const PoemsList: React.FC<PoemsListProps> = observer(({author}) => {
    const [poems, setPoems] = useState<IPoem[]>([]);
    const [authorPoems, setAuthorPoems] = useState<IPoem[]>([]);
    const [poem, setPoem] = useState<IPoem>({} as IPoem);
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleAddPoem, setVisibleAddPoem] = useState<boolean>(false);
    const {library} = useContext(Context);

    useEffect(() => {
        fetchPoems()
            .then(data => setPoems(data.sort((a: IPoem, b: IPoem) => a.title > b.title ? 1 : -1)))
            .catch(err => alert(err.message))
    }, [library.toggle]);

    useEffect(() => {
        setAuthorPoems(poems.filter(poem => poem.authorId === author.id));
    }, [poems]);

    const selectPoem = (item: IPoem) => {
        setPoem(item);
        setVisible(true)
    };

    return (
        <Container>
            <div className="poems-list__title">
                <h3 style={{textAlign: 'center'}}>Книги автора:</h3>
                {/* <i className="bi bi-plus-circle quotes__title_icon" onClick={() => setVisibleAddPoem(true)}></i> */}
            </div>
            {/* {Boolean(authorPoems.length) && */}
                <ListGroup className="poems-list__list">
                    <List 
                        items={authorPoems} 
                        renderItem={(poem: IPoem) => 
                            <PoemItem
                                poem={poem} 
                                onClick={(poem) => selectPoem(poem)}                  
                                key={poem.id} 
                            />
                        } 
                    />
                </ListGroup>
            {/* } */}
            <ModalPoemDetail 
                showPoem={visible} 
                onHidePoem={() => setVisible(false)} 
                poem={poem}
            />
            {/* <ModalPoemAdd
                show={visibleAddPoem}
                onHide={() => setVisibleAddPoem(false)}
            /> */}
        </Container>        
    );
});

export default PoemsList;