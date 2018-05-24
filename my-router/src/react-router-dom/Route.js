import React, { Component } from 'react';
import { Consumer } from './context';
import pathToRegExp from 'path-to-regexp';

class Route extends Component {
  render() {
    return (
      <Consumer>
        {
          state => {
            // 找到与pathname相匹配的组件
            let { path, component: Component, exact = false } = this.props;
            // path 是route传递过来到的
            // pathname是location
            let pathname = state.location.pathname;
            let reg = pathToRegExp(path, [], { end: exact });
            let result = pathname.match(reg);
            let props = {
              location: state.location,
              history: state.history,
              match: {}
            }

            // 根据path实现一个正在匹配
            if (result) {
              return <Component {...props}></Component>
            }
            return null;
          }
        }
      </Consumer>
    );
  }
}

export default Route;