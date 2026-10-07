import React from 'react';
import { Card } from 'react-bootstrap';

import { IAuthor } from '../../types/types';

import './authorItem.sass';

interface AuthorItemProps {
    author: IAuthor;
    onClick: (author: IAuthor) => void;
};


const AuthorItem: React.FC<AuthorItemProps> = ({author, onClick}) => {    
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