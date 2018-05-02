import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// 生命周期；组件自己不会主动卸载
// 0 组件开始
// 1. static defaultProps
// 2. constructor 内部可以声明状态 获取属性
// 3. componentWillMount
// 4. render 渲染组件
// 5. componentDidMount 组件加载完成
// 6. `shouldComponentUpdate` 组件是否更新；可以再次进行优化; PureComponent可以实现状态不变，不更新；
// 7. componentWillUpdate 组件将要更新
// 8. componentDidUpdate 组件更新完成


// React.PureComponent 会比较两个状态，状态不变，不更新渲染；浅比较，比较的是引用空间；

// 不要随意调用setState()；可能会递归，执行死循环；
// 父组件的render()先执行，后执行子组件的render()方法;
// 子组件先更新完成，父组件再更新完成



// class Lifecycle extends React.PureComponent {
class Lifecycle extends Component {

  static defaultProps = {

  }

  getInitialState(){

    console.log(this.propss)
  }
  constructor() {
    super();
    this.state = {
      number: 0
    }
  }
  
  componentWillMount() {
    // 将要加载
    // 取本地数据，同步代码渲染之前加载；
    localStorage.getItem('a') //同步;放在此处更改，省去了二次渲染；
    console.log('willmount')
  }

  handleClick = () => {
    this.setState({ number: this.state.number + 1 })
  }
  shouldComponentUpdate(nextProps, nextState) {
    // 是否需要更新组件；
    // return false 就不会调用render方法
    return nextState.number !== this.state.number;//状态不变，就不更新组件

    if (nextState.number % 2) {
      // 偶数更新
      return false;//阻止页面渲染，
    }

    // 此方法中，不能调用setState()
  }
  componentWillUpdate() {
    // 组件将要更新
  }
  componentDidUpdate() {
    // 组件更新完成
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.n % 3;//3 时不更新
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        < ChildCounter n={this.state.number} />
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
  componentDidMount() {
    // 加载成功
    //
  }
  componentWillUnmount() {
    // 将要卸载
  }
}

class ChildCounter extends Component {
  componentWillMount() {

  }
  componentWillReceiveProps(newProps) {
    // 接受新属性，组件第一次加载时不会执行；
  }
  render() {
    return (
      <div>
        {this.props.n}
      </div>
    )
  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }
}
export default Lifecycle;
