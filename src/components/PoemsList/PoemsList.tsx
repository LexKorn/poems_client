import React, {useState} from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { IPoem, IAuthor } from '../../types/types';
import ModalPoemDetail from '../Modals/ModalPoemDetail';
import List from '../List/List';
import PoemItem from '../PoemItem/PoemItem';

import './poemsList.sass';

interface PoemsListProps {
    authorPoems: IPoem[];
    author: IAuthor
};


const PoemsList: React.FC<PoemsListProps> = observer(({authorPoems, author}) => {
    const [poem, setPoem] = useState<IPoem>({} as IPoem);
    const [visible, setVisible] = useState<boolean>(false);

    const selectPoem = (item: IPoem) => {
        setPoem(item);
        setVisible(true)
    };

    console.log('PoemsList рендерится, стихов:', authorPoems.length);

    return (
        <Container>
            <div className="poems-list__title">
                <h3 style={{textAlign: 'center'}}>Стихи автора:</h3>
            </div>
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
                author={author}
            />
        </Container>        
    );
});

export default PoemsList;