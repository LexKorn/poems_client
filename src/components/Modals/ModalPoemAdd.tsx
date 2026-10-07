// src/components/Modals/ModalPoemAdd.tsx
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { createPoem } from '../../http/poemsAPI';

interface ModalPoemAddProps {
    show: boolean;
    onHide: () => void;
    authorId: number;
    onPoemAdded?: () => void;
}

const ModalPoemAdd: React.FC<ModalPoemAddProps> = observer(({ show, onHide, authorId, onPoemAdded }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert('Заполните заголовок и содержание стиха');
            return;
        }
        
        setLoading(true);
        try {
            await createPoem({
                title: title.trim(),
                content: content.trim(),
                html_content: content.trim(),
                //@ts-ignore
                authorId: authorId
            });
            
            setTitle('');
            setContent('');
            onHide();
            
            // Вызываем колбэк для обновления списка
            if (onPoemAdded) {
                onPoemAdded();
            }
        } catch (error) {
            console.error('Ошибка создания стиха:', error);
            alert('Не удалось создать стих');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Добавить стихотворение</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Введи название"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Содержание</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={10}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Введи текст стихотворения"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Сохранение...' : 'Сохранить'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalPoemAdd;