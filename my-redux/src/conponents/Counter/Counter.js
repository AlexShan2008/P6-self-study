import React, { Component } from 'react';
import { connect } from 'react-redux';//实现redux和组件的连接
import actions from '../../store/actions/counter.js';

class Counter extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <input type='text' /> {this.props.number}
        <button
          onClick={() => {
            this.props.add(2);
          }}>+</button>
        <button
          onClick={() => {
            this.props.minus(1);
          }}>-</button>
      </div>
    );
  }
}

// connect调用后 返回新组件
// mapStateToProps, mapDispatchToProps 自定义的两个参数
let mapStateToProps = (state) => {
  // store.getState()
  // 返回结果将做新组件的属性
  return { number: state.c.number }

}

let mapDispatchToProps = (dispatch) => {
  // store.dispatch()
  return {
    add(n) { dispatch(actions.add(n)) },
    minus(n) { dispatch(actions.minus(n)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);