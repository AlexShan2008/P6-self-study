import React, { Component } from 'react';

// 受控组件和非受控组件
// 指的都是表单input
// 受控组件可以对输入进行监控
// 赋默认值

class Control extends Component {
  constructor() {
    super();
    this.state = {
      content: 'hello',
      b:'world'
    }
  }
  handleSubmit = (e) => {
    // 不能写return false
    e.preventDefault();//阻止提交表单事件，可以兼容各浏览器，react封装的
  }
  handleChange=(e)=>{
    let name = e.target.name;//getAttribute
    this.setState({[name]:e.target.value.toString()});//[name] content b
  }
  render() {
    return (
      // ajax提交表单
      // 双向数据绑定
      // 默认先将状态绑定到视图上，状态不变是不变
      <form onSubmit={this.handleSubmit}>
        <input 
        type='text' 
        required={true}
        value={this.state.content}
        name='content'
        onChange={this.handleChange}
        />
        <h3>{this.state.content}</h3>
        <input
          type='text'
          required={true}
          value={this.state.b}
          name='b'
          onChange={this.handleChange}
        />
        <h3>{this.state.b}</h3>
        <input type='submit' />
      </form>
    );
  }
}

export default Control;