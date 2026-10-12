import React from 'react';
import { Modal } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { IAuthor, IPoem } from '../../types/types';
import PoemEditor from '../PoemEditor/PoemEditor';


interface ModalPoemAddProps {
    show: boolean;
    onHide: () => void;
    authorId: number;
    author: IAuthor;
    onPoemAdded?: () => void;
}

const ModalPoemAdd: React.FC<ModalPoemAddProps> = observer(({ show, onHide, authorId, author, onPoemAdded }) => {
    const emptyPoem: IPoem = {
        id: 0,
        title: '',
        content: '',
        html_content: '',
        userId: 0,
        authorId: authorId,
    };

    const handleSave = () => {
        onHide();
        if (onPoemAdded) {
            onPoemAdded();
        }
    }; 

    
    return (
        <Modal show={show} onHide={onHide} fullscreen="xxl" centered>
            <Modal.Header closeButton>
                <Modal.Title>Добавить стихотворение</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PoemEditor 
                    poem={emptyPoem}
                    author={author}
                    onSave={handleSave}
                />
            </Modal.Body>
        </Modal>
    );
});

export default ModalPoemAdd;