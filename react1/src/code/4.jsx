import React, { Component } from 'react';
import {render} from 'react-dom';

class School extends Component {
  render() {
    return (
      <div>
        <Student name= 'shanguo' />
        booo
      </div>
    );
  }
}
export default School;

function Student (name){
  return <h2>{name}</h2>
}
// 判断
// 数组可以直接渲染到页面上
// 渲染类别要用map,不能用forEach(没有返回值)

let dinner = ['hanbao', 'cocolo','chicken'];
let eleObj = dinner.map((item,index)=>(
<li key={index}>{item}</li>))

render(<School />,
document.getElementById('root'));


