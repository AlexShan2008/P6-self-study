import React, { Component } from 'react';
// 非受控组件
// 1.可以操控dom 获取真实dom
// 2.可以和第三方库结合
// 3.React.createRef();// v 16.3
class Unctrol extends Component {
  constructor(){
    super();
    this.text =React.createRef();
  }
  componentDidMount(){
    this.text.current.focus();//
  }
  render() {
    return (
      <div>
      <input 
      type='text'
      ref={this.text} />
      </div>
    );
  }
}

export default Unctrol;