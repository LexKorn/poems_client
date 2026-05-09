import React, {useState, useEffect, useContext} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { MAIN_ROUTE, AUTHORS_ROUTE } from "../../utils/consts";
import { Context } from '../../index';

import './header.sass';


const Header: React.FC = () => {
    const location = useLocation();
    const [classMenu, setClassMenu] = useState<string>('');
    const {users} = useContext(Context);

    useEffect(() => {
        setClassMenu('');
    }, [location.pathname]);

    const menuHandler = () => {
        classMenu === '' ? setClassMenu('open-menu') : setClassMenu('');
    };

    const logOut = () => {
        users.setIsAuth(false);
        localStorage.clear();
    };

    return (
        <>
            {users.isAuth ?
                <div className='header'>
                    <div className={"header__menu-burger" + ' ' + classMenu} onClick={() => menuHandler()}>
                        <span></span>
                    </div>

                    <nav className={'header__nav' + ' ' + classMenu}>
                        <ul className="header__menu">
                            <li className="header__menu_item">
                                <NavLink to={MAIN_ROUTE} className={location.pathname === MAIN_ROUTE ? "active" : ''} >
                                    СТИХОТВОРЕНИЯ
                                </NavLink>
                            </li>
                            <li className="header__menu_item">
                                <NavLink to={AUTHORS_ROUTE} className={location.pathname === AUTHORS_ROUTE ? "active" : ''} >
                                    АВТОРЫ
                                </NavLink>
                            </li>
                            <li className="header__menu_item">
                                <Button 
                                    variant={"outline-secondary"} 
                                    onClick={() => logOut()} 
                                    className="ms-2 nav-btn"
                                    >Выйти
                                </Button> 
                            </li>
                        </ul>
                    </nav>
                </div>
            :
                <div></div>
            }
        </>
    );
};

export default Header;