import React from 'react';
import { hydrate } from 'react-dom';
import Appclient from './components/Appclient';
import Vitrine from './components/Vitrine';
import routes from '../../config/routes';
import extractDomain from 'extract-domain';

let domain = extractDomain(window.location.href);
let u = window.location.href.split("//")[1].replace(window.location.href.split("//")[1].split("/")[0], "").split('?');
let url = u[0];
let getUrl = [];
if(u.length > 1){
    getUrl = u[1].split('&');
}
console.log(getUrl);
let paseGetUrl = [];
for(let gt of getUrl){
    let getsplit = gt.split('=');
    let obj = {};
    obj[getsplit[0]] = getsplit[1];
    paseGetUrl.push(obj);
}
console.log(paseGetUrl);
let routesArray = [];
for (var route in routes.routes) {
    routesArray.push(route);
}

if(routesArray.indexOf('GET '+url) != -1){
    if(url == '/'){
        hydrate(
            <Vitrine data={
                    {
                        url: url,
                        domain: domain,
                        get: paseGetUrl,
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
                        domain: domain,
                        get: paseGetUrl,
                        app: 'client'
                    }
                }/>,
            document.getElementById('root')
        );
    }
}


