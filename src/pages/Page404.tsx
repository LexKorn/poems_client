import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";


const Page404: React.FC = () => {
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content='Page not found'
                />        
                <title>404 page</title>
            </Helmet>
            <div style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}}>Такой страницы нет</div>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'color': '#9F0013', 'marginTop': '30px'}} to="/">Вернуться на Главную</Link>
        </div>
    )
}

export default Page404;