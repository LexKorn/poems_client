import React, { useContext } from 'react';
import {Container, Button, Form} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { Context } from '../../index';

interface CUAuthorProps {
    id: number;
    name: string;
    setName: (name: string) => void;
    handler: (id: number, name: string) => Promise<unknown>;
    title: string;
    btnName: string;
};


const CUAuthor: React.FC<CUAuthorProps> = observer(({id, name, setName, handler, title, btnName}) => {
    const {library} = useContext(Context);

    const onClick = () => {
        if (!name.trim()) {
            return alert('Имя автора обязательно для заполнения');
        }

        if (btnName === 'Добавить') {
            // @ts-ignore 
            handler(name)
                .then(() => {
                    library.setVisibleModal(false);
                    window.location.reload();
                })
                .catch(err => alert(err.response.data.message));
        } else {
            handler(id, name)
                .then(() => {
                    library.setVisibleModal(false);
                    window.location.reload();
                })
                .catch(err => alert(err.response.data.message));
        }
    };

    return (
        <Container className="d-flex justify-content-center">
            <div>
                <h1>{title}</h1>
                <Form>
                    <Form.Control
                        className="mt-3"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Введите автора"
                    />
                </Form>
                <Button variant={btnName === 'Добавить' ? "outline-success" : "outline-primary"} onClick={onClick} className="mt-3">{btnName}</Button>           
            </div>
        </Container>
    );
});

export default CUAuthor;