import React, {useContext} from 'react';
import { Card } from 'react-bootstrap';

import { IAuthor, IStamp, IModel } from '../../types/types';
import { Context } from '../../index';

import './authorItem.sass';

interface AuthorItemProps {
    author: IAuthor;
    onClick: (author: IAuthor) => void;
};


const AuthorItem: React.FC<AuthorItemProps> = ({author, onClick}) => {    
    // const {service} = useContext(Context);

        return (
            <Card 
                className="author-card shadow"
                onClick={() => onClick(author)}
            >
                <div className="author-card__owner" >{author.name}</div>
            </Card>
        );
};

export default AuthorItem;