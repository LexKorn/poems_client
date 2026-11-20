import React, {useState, useEffect, useContext} from 'react';

import { IAuthor } from '../../types/types';
import { Context } from '../../index';

import './searchPanel.sass';

interface SearchPanelProps {
    authors: IAuthor[];
};


const SearchPanel: React.FC<SearchPanelProps> = ({authors}) => { 
    const {library} = useContext(Context);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        library.setVisibleAuthors(sort(search(authors, value)));
    }, [value, authors]);

    function search(items: (IAuthor)[], term: string) {   
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return (             
                item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        }); 
    };

    function sort(items: (IAuthor)[]) {        
        let sortItems: (IAuthor)[] = [];

        sortItems = [...items].sort((a, b) => {
            return a.name > b.name ? 1 : -1;
        });

        return sortItems;
    };


    return (
        <>  
            <div className='search'>
                <input 
                    className='search__input' 
                    type='text' 
                    placeholder='Начни вводить автора...' 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />            
                {Boolean(value) && <i className="bi bi-x-circle search__icon" onClick={() => setValue('')}></i>}
            </div>
        </>
    );
};

export default SearchPanel;