let str = require('./a');
import './common.css';

alert(0)

if(module.hot){
  //实现热更新，默认会把所有关联文件热更新；
  module.hot.accept();
}
if (__DEV__){
  console.log('dev')
}else{
  console.log('pro')
}

let oImg = new Image();
import png from './bg9.jpg';

document.write('shan tong  hongkong');

import React, { Component } from 'react';

class index extends Component {
  render() {
    return (
      <div>
        index REACT
      </div>
    );
  }
}

export default index;

render(
  <index />,
  document.getElementById('app')
)
