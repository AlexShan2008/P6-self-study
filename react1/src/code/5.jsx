import React, { Component } from 'react';
import { render } from 'react-dom';

// import 必须放到最顶部引入
// 函数组件：没有this 没有生命周期 没有状态
// 类组件
// 如何区分是组件还是jsx元素？
// 组件标签名一定要大写
// 组件必须要有返回值，也可以返回null，但是不能是undefined
// 组件，用标签进行调用，然后去执行函数，把返回值进行渲染

class Cook extends Component {
  render() {
    return (
      <div>
        {this.props.name} {this.props.age}
      </div>
    );
  }
}

export default Cook;

// 组件可以通过属性传递数据 {888} 数字  age ='888' 字符串
render(<Cook name='shanguo' age= {888} />,
  window.root);