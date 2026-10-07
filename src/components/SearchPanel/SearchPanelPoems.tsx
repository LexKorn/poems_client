import React, {useState, useEffect, useContext} from 'react';
import {observer} from 'mobx-react-lite';

import { IAuthor, IPoem } from '../../types/types';
import { fetchAuthors } from '../../http/authorsAPI';
import { Context } from '../../index';

import './searchPanel.sass';

interface SearchPanelPoemsProps {
    poems: IPoem[];
};


const SearchPanelPoems: React.FC<SearchPanelPoemsProps> = observer(({poems}) => { 
    const {library} = useContext(Context);
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        fetchAuthors()
            .then(data => setAuthors(data))
            .catch(err => alert(err.message));
    }, []);

    useEffect(() => {
        library.setVisiblePoems(search(poems, value));
    }, [value, poems]);

    function search(items: (IPoem)[], term: string) {   
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return (             
                item.title.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        }); 
    };


    return (
        <>  
            <div className='search'>
                <input 
                    className='search__input' 
                    type='text' 
                    placeholder='Начни вводить название стихотворения...' 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />            
                {Boolean(value) && <i className="bi bi-x-circle search__icon" onClick={() => setValue('')}></i>}
            </div>
        </>
    );
});

export default SearchPanelPoems;