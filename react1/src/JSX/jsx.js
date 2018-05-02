import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';//属性校验的包

let str = 'Beijing';
let el = <span>{str}</span>;

ReactDOM.render(el,
document.getElementById('root'));
