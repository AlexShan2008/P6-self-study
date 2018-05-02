import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import actions from '../../store/actions/todo';

window.store = store;

// 1. action-types 干什么事情
// 2. reducer 描述如何去干
// 3. actions
// 4. 组件中引入store 和actions

class Todo extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <input
          type='text'
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              this.props.addTodo(e.target.value)
            }
          }} />
        <ul>
          {this.props.todos.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect((state) => ({
  todos: state.t.todos
}), actions)(Todo);