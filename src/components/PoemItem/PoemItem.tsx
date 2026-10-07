import React, {useContext} from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';

import { MAIN_ROUTE } from '../../utils/consts';
import { IAuthor, IPoem} from '../../types/types';
import { Context } from '../../index';

import './poemItem.sass';

interface PoemItemProps {
    poem: IPoem;
    onClick: (poem: IPoem) => void;
};


const PoemItem: React.FC<PoemItemProps> = observer(({poem, onClick}) => {  
    const {library} = useContext(Context);
    const location = useLocation();
    const isMain = location.pathname === MAIN_ROUTE;
    const authorPoem: IAuthor[] = library.authors.filter(author => author.id === poem.authorId);  

    if (Boolean(authorPoem.length)) {
        return (
            <Card 
                className="poem-card shadow"
                onClick={() => onClick(poem)}
            >
                {isMain ?
                    <div>
                        <div className="poem-card__title">{poem.title}</div>
                        <div className='poem-card__author'>{authorPoem[0].name}</div>
                    </div>
                    :
                    <div className="poem-card__title">{poem.title}</div>
                }
            </Card>
        );
    } else {
        return (
            <></>
        );
    }
});

export default PoemItem;