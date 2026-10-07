import React from 'react';
import {observer} from 'mobx-react-lite';
import { Modal } from 'react-bootstrap';

import { IAuthor, IPoem } from '../../types/types';
import PoemEditor from '../PoemEditor/PoemEditor';

interface ModalPoemDetailProps {
    showPoem: boolean;
    onHidePoem: () => void;
    poem: IPoem;
    author: IAuthor;
    onEdit?: (poem: IPoem) => void;
    onSave?: () => void;
};


const ModalPoemDetail: React.FunctionComponent<ModalPoemDetailProps> = observer(({showPoem, onHidePoem, poem, author, onEdit, onSave}) => {
    return (
        <Modal
            show={showPoem}
            onHide={onHidePoem}
            fullscreen="xxl"
            >
            <Modal.Header closeButton>
                <Modal.Title>
                    {poem.id ? 'Редактирование стиха' : 'Новый стих'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PoemEditor 
                    poem={poem}
                    author={author}
                    onSave={() => {
                        if (onSave) onSave();
                        onHidePoem();
                    }}
                />
            </Modal.Body>
        </Modal>
    );
});

export default ModalPoemDetail;