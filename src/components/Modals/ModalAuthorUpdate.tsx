import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';

import { updateAuthor } from '../../http/authorsAPI';
import { IAuthor } from '../../types/types';
import CUAuthor from '../CreateUpdate/CUAuthor';

interface ModalAuthorUpdateProps {
    show: boolean;
    onHide: () => void;
    author: IAuthor;
};


const ModalAuthorUpdate: React.FC<ModalAuthorUpdateProps> = ({show, onHide, author}) => {
    const [name, setName] = useState<string>(author.name);
    
    return (
        <Modal
            show={show}
            onHide={onHide}
            // @ts-ignore
            size="md"
            centered
            >
            <Modal.Body>
                <CUAuthor 
                    id={author.id}
                    name={name}
                    setName = {setName}
                    // @ts-ignore
                    handler={updateAuthor}
                    title='Обновить автора'
                    btnName='Обновить'
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary "} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAuthorUpdate;