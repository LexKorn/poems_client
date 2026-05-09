import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';

import { createAuthor } from '../../http/authorsAPI';
import CUAuthor from '../CreateUpdate/CUAuthor';

interface ModalPoemAddProps {
    show: boolean;
    onHide: () => void;
};


const ModalAuthorAdd: React.FC<ModalPoemAddProps> = ({show, onHide}) => {
    const [name, setName] = useState<string>('');
    
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
                    id={0}
                    name={name}
                    setName = {setName}
                    // @ts-ignore
                    handler={createAuthor}
                    title='Добавить автора'
                    btnName='Добавить'
                    show={show}
                    onHide={onHide}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary "} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAuthorAdd;