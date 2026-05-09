import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {Spinner} from 'react-bootstrap';


const PoemPage: React.FC = observer(() => {
    const [loading, setLoading] = useState<boolean>(true);
    const {id} = useParams();

    return (
        <div>
           Temp
        </div>
    );
});

export default PoemPage;