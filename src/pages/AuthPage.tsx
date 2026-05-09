import React, {useState, useContext} from 'react';
import {Container, Form, Card, Button} from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {AxiosError} from 'axios';
import {Helmet} from "react-helmet";

import { LOGIN_ROUTE, REGISTER_ROUTE, MAIN_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import {Context} from '../index';


const AuthPage: React.FC = () => {
    const {users} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            if (isLogin) {
                await login(email, password).then(() => {
                    users.setIsAuth(true);
                    navigate(MAIN_ROUTE);
                });
            } else {
                await registration(email, password).then(() => {
                    users.setIsAuth(true);
                    navigate(MAIN_ROUTE);
                });
            }  
        } catch(err: unknown) {
            const error = err as AxiosError;
            alert(JSON.parse(error.request.response).message);
        }        
    };

    return (
        <Container 
            className='d-flex justify-content-center align-items-center'
            style ={{height: window.innerHeight - 54}}
        >
            <Helmet>
                <title>Авторизация</title>
                <meta name="description" content="Авторизация" />
            </Helmet>
            <Card style={{width: 600}} className="p-5">
                <h2 className='m-author'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                    <div className="d-flex justify-content-between mt-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTER_ROUTE}>Зарегистрируйтесь!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }                        
                        <Button 
                            onClick={click}
                            variant={"outline-success"}
                            >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </div>                  
                </Form>
            </Card>
        </Container>
    );
};

export default AuthPage;