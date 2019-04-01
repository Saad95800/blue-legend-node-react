"use strict";

import React from 'react';
import Layout from '../layout.js';

export default class Home extends React.Component {
  render() {
    return (
        <div>
          <div onMouseOver={ () =>{alert("hello")} }>HomePage test 1</div>
          <Layout><div className="ouie">aie aie aie ouie</div></Layout>
        </div>

    );
  }
}