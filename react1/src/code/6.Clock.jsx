import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

// 需要美秒更新状态，所有函数组件不适合
// 我们创建的组件一定要继承React.Component

// 什么时候放在this.state上？什么时候放在实例this上；
// this.state会刷新页面

// 组件有两个数据源：都会更新页面
// 1. this.props 属性 外界获取的
// 2. this.state 状态 自己的

// 类组件要用render方法
class Clock extends Component {
  constructor() {
    super();//初始化this
    this.state = {
      name: 'shanguo',
      date: new Date().toLocaleString()
    };//组件状态初始化
    // this.handleClick = this.handleClick.bind(this);
  }
  // state = {date: new Date().toLocaleDateString()}; //和上面写法相同
  componentWillMount() {

  }
  componentDidMount() {
    // 组件被渲染到DOM之后触发
    this.timer = setInterval(() => {
      this.setState({
        date: new Date().toLocaleString()
      })
    }, 1000)
  }
  componentWillUnmount() {
    // 组件将要被卸载；
    // 卸载组件时要移除定时器和组件上绑定方法；
    clearInterval(this.timer);
  }
  // 绑定方法：我们希望this指向当前实例
  // 1. 在DIV上直接加箭头函数 
  // <div onClick={() => {
  //   this.handleClick
  // }}>
  // 2. bind(this)
  //  <div onClick={ this.handleClick.bind(this) }>
  // 3. 构造函数中绑定 
  // this.handleClick = this.handleClick.bind(this);
  // 4. ES7 可以解决this指向，绑定到实例上
  // handleClick =()=>{

  // }

  // 摘除组件
  //  ReactDOM.unmountComponentAtNode(document.querySelector('#root'));//移除组件

  handleClick = () => {
    ReactDOM.unmountComponentAtNode(document.querySelector('#root'));//移除组件
  }
  render() {
    return (
      <div onClick={this.handleClick}>
        {this.state.name}
        <span>当前时间：</span>
        {this.state.date.toString()}
      </div>
    );
  }
}

render(<Clock />,
  window.root);

