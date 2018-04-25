import React, { Component } from 'react';
import { render } from 'react-dom';

// jsx 和html写法不完全一样
// className  class
// htmlFor  lable for
// jsx 
// React.Fragment 可以用来包裹组件，页面不会显示
// 组件内可以放js代码 { }
// 区分是不是js语法根据是不是{ } 只要有返回值的js代码都可以放在里面运行，不能写if else
// style 
// dangerouslySetInnerHTML

let name = 'Beijing';
let age = 9;
let style = { fontSize: '60px' }

class Read extends Component {
  render() {
    return (
      <React.Fragment>
        <label htmlFor="input">输入姓名</label>
        <input type="text" id='input' />
        <h1 style={{ color: 'red' }}>
          {/* 这个是注释代码 */}
          {name}
          {age}
          Beijing
        </h1>
        <div dangerouslySetInnerHTML={{__html:'<h1>hello shanghai</h1>'}}></div>
      </React.Fragment>
    );
  }
}

export default Read;

render(<Read />,
  document.getElementById('root'));