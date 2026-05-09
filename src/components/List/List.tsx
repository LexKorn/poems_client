import React from 'react';

import './list.sass';

interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
};


export default function List<T> (props: ListProps<T>) {
    return (
        <div className="list">
            {!props.items.length ? 
                <div className="list__empty">Здесь пока ничего нет...</div>
            :
                props.items.map(props.renderItem)
            }           
        </div>
    );
};