import React from 'react';
import {observer} from 'mobx-react-lite';
import { Modal } from 'react-bootstrap';

import { IPoem } from '../../types/types';
import PoemEditor from '../PoemEditor/PoemEditor';

interface ModalPoemDetailProps {
    showPoem: boolean;
    onHidePoem: () => void;
    poem: IPoem;
    onEdit?: (poem: IPoem) => void;
    onSave?: () => void;
};


const ModalPoemDetail: React.FunctionComponent<ModalPoemDetailProps> = observer(({showPoem, onHidePoem, poem, onEdit, onSave}) => {
    return (
        <Modal
            show={showPoem}
            onHide={onHidePoem}
            fullscreen="xxl"
            >
            <Modal.Body>
                <PoemEditor 
                    poem={poem}
                    onSave={onSave}
                />
            </Modal.Body>
        </Modal>
    );
});

export default ModalPoemDetail;