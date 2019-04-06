import React from 'react';
import { hydrate } from 'react-dom';
import Appclient from './components/Appclient';

let url = window.location.href.split("//")[1].replace(window.location.href.split("//")[1].split("/")[0], "");
hydrate(
    <Appclient data={
            {
                url: url
            }
        }/>,
    document.getElementById('root')
);
