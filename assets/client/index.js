import React from 'react';
import { hydrate } from 'react-dom';
import Appclient from './components/Appclient';
import Vitrine from './components/Vitrine';
import routes from '../../config/routes';

let url = window.location.href.split("//")[1].replace(window.location.href.split("//")[1].split("/")[0], "");
let routesArray = [];
for (var route in routes.routes) {
    routesArray.push(route);
}
console.log(url);
console.log(routesArray.indexOf('GET '+url));

if(routesArray.indexOf('GET '+url) != -1){
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
}


