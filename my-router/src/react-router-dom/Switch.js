import React, { Component } from 'react';
import { Consumer } from './context';
import pathToRegExp from 'path-to-regexp';

// switch作用：只匹配一个路径；
// 只要找到匹配路径，就不会继续向下匹配；
class Switch extends Component {
  render() {
    return (
      <Consumer>
        {
          state => {
            let pathname = state.location.pathname;
            let children = this.props.children;
            for (let i = 0; i < children.length; i++) {
              let child = children[i];
              let path = child.props.path || '';// Redirect 没有path属性
              let reg = pathToRegExp(path, [], { end: false });
              if (reg.test(pathname)) {
                // 返回匹配的组件
                return child;
              }
              return null;
            }
          }
        }

      </Consumer>
    );
  }
}

export default Switch;