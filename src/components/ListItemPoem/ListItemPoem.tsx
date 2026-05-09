import React from 'react';
import { Card } from 'react-bootstrap';

import { IPoem } from '../../types/types';

interface ListItemPoemProps {
    item: IPoem;
    onClick: (poem: IPoem) => void;
    onEdit: (poem: IPoem) => void;
};


const ListItemPoem: React.FC<ListItemPoemProps> = ({item, onClick, onEdit}) => {
    return (
        <Card 
            className="d-flex justify-content-between shadow" 
            style={{padding: 10, marginTop: 15, flexDirection: 'row', fontSize: 18, lineHeight: '35px', cursor: 'pointer'}}
        >
            <div onClick={() => onClick(item)} style={{flex: 1}}>
                {item.title}
            </div>
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit(item);
                }}
                className="btn btn-sm btn-outline-primary ms-2"
            >
                Редактировать
            </button>
        </Card>   
    );
};

export default ListItemPoem;