import React, {useState} from 'react';
import { Card } from 'react-bootstrap';

import { IPoem } from '../../types/types';

import './listItem.sass';

interface ListItemProps {
    item: IPoem;
    onDelete: (item: IPoem) => void;
    onEdit: (item: IPoem) => void;
};


const ListItem: React.FC<ListItemProps> = ({item, onDelete, onEdit}) => {
    const [hover, setHover] = useState<boolean>(false);

    return (
        <Card 
            className="list-item shadow"
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div>
                <div>{item.title}</div>
            </div>
            <div style={{display: hover ? 'block' : 'none'}}>
                <i className="bi bi-pencil-fill list-item__icon" onClick={() => onEdit(item)}></i>
                <i className="bi bi-trash3-fill list-item__icon" onClick={() => onDelete(item)}></i>
            </div>
        </Card>      
    );
};

export default ListItem;