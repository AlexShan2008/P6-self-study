import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import Counter from './conponents/Counter/Counter';
import Todo from './conponents/Todo/Todo';

// react-redux provider
// Provider 只能包一个子节点
// 引入store,以后每个组件不需要导入store也不需要订阅状态等 

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Counter />
          <Todo />
        </div>
      </Provider>
    );
  }
}

render(
  <Index />,
  document.getElementById('root'))
