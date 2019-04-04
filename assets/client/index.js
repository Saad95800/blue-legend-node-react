import React from 'react';
import { hydrate } from 'react-dom';
import Appclient from './components/Appclient';

hydrate(
    <Appclient data={
            {
                url: '/'+window.location.href.split("/")[3]
            }
        }/>,
    document.getElementById('root')
);