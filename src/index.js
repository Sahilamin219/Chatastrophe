// require('./index2.js');
// console.log('hello from index.js !');
// var React = require('react');
// var ReactDOM = require('react-dom');
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'

// ReactDOM.render(React.createElement('h1', null, 'hello from react !'), document.getElementById('root'));
// ReactDOM.render( <h1> hello from ES6! </h1> , document.getElementById('root'));
ReactDOM.render( <App/> , document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
     <App/>,
     document.getElementById('root')
    );
  });
}