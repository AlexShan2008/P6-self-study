import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let ele = (
  <h1 className='red'>
    <span>zfpx</span>
    Hello world!
  </h1>
);


console.log(React.createElement(
  'h1',
  { className: 'red' },
  React.createElement(
    'span',
    null,
    'zfpx'
  ),
  'Hello world!'
));

// 先将jsx语法转换成createElement格式，
// 再转换成一个对象
// {
// type, props, children
// }
// 最后用render方法进行渲染
ReactDOM.render(ele, document.getElementById('root'));
