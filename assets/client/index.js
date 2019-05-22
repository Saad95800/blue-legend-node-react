import React from 'react';
import { hydrate } from 'react-dom';
import Appclient from './components/Appclient';
import Vitrine from './components/Vitrine';

let url = window.location.href.split("//")[1].replace(window.location.href.split("//")[1].split("/")[0], "");
if(url == '/'){
    hydrate(
        <Vitrine data={
                {
                    url: url,
                    app: 'client'
                }
            }/>,
        document.getElementById('root')
    );
}else{
    hydrate(
        <Appclient data={
                {
                    url: url,
                    app: 'client'
                }
            }/>,
        document.getElementById('root')
    );
}

