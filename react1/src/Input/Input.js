import React, { Component } from 'react';

// 受控组件；实现双向绑定
// 1. 受状态控制组件，必须要有onChange方法，否则不能使用；
// 2. 受控组件，可以赋予默认值（官方推荐使用受控组件

class Input extends Component {
  constructor() {
    super();
    this.state = {
      a: 1, //默认值
      b: 2
    }
  }

  // 处理多个输入框映射到状态的方法；实现相加
  // key 表示当前状态改的是哪个
  // handleChange = (key, e) => {
  //   this.setState({
  //     [key]: parseInt(e.target.value) || 0
  //   });
  // }
  // handleChange = (e) => {
  //   // e事件源;
  //   let val = e.target.value;//输入框的值
  //   this.setState({ val });
  // }

  //  onChange={this.handleChange} 如果要传参，需要加箭头函数；
  //
  // render() {
  //   return (
  //     <div>
  //       <input type='text'
  //         ref='a'
  //         value={this.state.a}
  //         onChange={e => {
  //           this.handleChange('a', e)
  //         }}
  //       />
  //       <input type='text'
  //         ref='b'
  //         value={this.state.b}
  //         onChange={e => {
  //           this.handleChange('b', e)
  //         }}
  //       />
  //       和 =  {this.state.val}
  //     </div>
  //   );
  // }


  // 方法二 非受控组件 不推荐此方法(除非无初始默认值)
  // 通过ref设置的属性，可以通过this.refs获取对应DOM元素
  // 输入框不受状态控制，不能初始化默认值
  handleChange = (key, e) => {
    let result = this.refs.a.value + this.refs.b.value;
    this.setState({ result });
  }
  render() {
    return (
      <div
        onChange={this.handleChange}>
        <input type='number'
          ref='a'
        />
        <input type='number'
          ref={x => this.b = x}
        />
        和 =  {this.state.result}
      </div>
    );
  }
}

export default Input;
