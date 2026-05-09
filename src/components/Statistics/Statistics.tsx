import React, {useState, useEffect, useContext} from 'react';
import { NavLink } from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import { Context } from '../..';
import {MAIN_ROUTE, AUTHORS_ROUTE} from '../../utils/consts';

import './statistics.sass';


const Statistics: React.FC = observer(() => {
    const [quantityAuthors, setQuantityAuthors] = useState<number>(0);
    const [quantityPoems, setQuantityPoems] = useState<number>(0);
    const {library} = useContext(Context);

    useEffect(() => {
        setQuantityAuthors(library.authors.length);
        setQuantityPoems(library.poems.length);
    }, [library.authors, library.poems]);

    return (
        <>
            <div className='statistics'>
                <div className='statistics__icons'>
                    <NavLink to={MAIN_ROUTE} className='statistics__icons_link'><i className="bi bi-book-half"></i>{quantityPoems}</NavLink>
                    <NavLink to={AUTHORS_ROUTE} className='statistics__icons_link'><i className="bi bi-person-fill"></i> {quantityAuthors}</NavLink>
                </div>
            </div>
        </>
    );
});

export default Statistics;