import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Button, Form, Dropdown} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

// import { Context } from '../../index';
import { AUTHORS_ROUTE } from '../../utils/consts';

interface CUAuthorProps {
    id: number;
    name: string;
    setName: (name: string) => void;
    handler: (id: number, name: string) => Promise<unknown>;
    title: string;
    btnName: string;
};


const CUAuthor: React.FC<CUAuthorProps> = observer(({id, name, setName, handler, title, btnName}) => {
    // const {service} = useContext(Context);
    const navigate = useNavigate();
    // const [visible, setVisible] = useState<boolean>(false);

    const onClick = () => {
        if (!name.trim()) {
            return alert('Имя автора обязательно для заполнения');
        }

        if (btnName === 'Добавить') {
            // @ts-ignore 
            handler(name)
                .then(() => {navigate(AUTHORS_ROUTE)})
                .catch(err => alert(err.response.data.message));
        } else {
            handler(id, name)
                .then(() => {navigate(AUTHORS_ROUTE)})
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