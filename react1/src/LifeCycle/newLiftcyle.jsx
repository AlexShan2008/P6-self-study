import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// 生命周期； 组件自己不会主动卸载
// 1. static defaultProps
// 2. constructor 内部可以声明状态 获取属性
// 3. componentWillMount
// 4. render 渲染组件
// 5. componentDidMount 组件加载完成
// 6. `shouldComponentUpdate` 组件是否更新；可以在次进行优化; PureComponent可以实现状态不变，不更新；
// 7. componentWillUpdate 组件将要更新
// 8. componentDidUpdate 组件更新完成 React.PureComponent
// 会比较两个状态，状态不变，不更新渲染；浅比较，比较的是引用空间； 不要随意调用setState()；可能会递归，执行死循环；
// 父组件的render()先执行，后执行子组件的render()方法; 子组件先更新完成，父组件再更新完成 class Lifecycle extends
// React.PureComponent { react v16.3终于出来了，最大的变动莫过于生命周期去掉了以下三个 componentWillMount
// componentWillReceiveProps componentWillUpdate 同时为了弥补失去上面三个周期的不足又加了两个 static
// getDerivedStateFromProps getSnapshotBeforeUpdate static
// getDerivedStateFromProps 触发时间：在组件构建之后(虚拟dom之后，实际dom挂载之前)，以及每次获取新的props之后。
// 每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state.配合componentDidUpdate，可以覆盖c
// o mponentWillReceiveProps的所有用法 class Example extends React.Component { static
// getDerivedStateFromProps(nextProps, prevState) {     // 没错，这是一个static } }
// getSnapshotBeforeUpdate 触发时间 : update发生的时候，在render之后，在组件dom渲染之前。
// 返回一个值，作为componentDidUpdate的第三个参数。 配合componentDidUpdate,
// 可以覆盖componentWillUpdate的所有用法。 class Example extends React.Component {
// getSnapshotBeforeUpdate(prevProps, prevState) {     // ...   } } 建议用法总结

// 1. 初始化state — Initializing state 在constructor初始化state就可以了

// 2. 请求数据 — Fetching external data 在componentDidMount请求异步加载的数据
// 有一种错觉，在componentWillMount请求的数据在render就能拿到，但其实render在willMount之后几乎是马上就被调用，根本等不
// 到 数据回来，同样需要render一次“加载中”的空数据状态，所以在didMount去取数据几乎不会产生影响。

// 3. 添加事件监听 — Adding event listeners(or subscriptions)
// 在componentDidMount中添加加事件监听 react只能保证componentDidMount -
// componentWillUnmount成对出现，componentWillMount可以被打断或调用多次，因此无法保证事件监听能在unmount的时候被
// 成 功卸载，可能会引起内存泄露

// 4. 根据props更新state — Updating state based on props
// 用getDerivedStateFromProps(nextProps, prevState), 将传入的props更新到state上
// 用来代替componentWillReceiveProps(nextProps,
// nextState)，willReceiveProps经常被误用，导致了一些问题，因此该方法将不被推荐使用。
// getDerivedStateFromProps是一个static方法，意味着拿不到实例的this，所以想要在setState之前比对一下props有没有
// 更 新，下面方法是不能用了 if (this.props.currentRow !== nextProps.currentRow) {   ... }
// 取而代之的是，额外写一个state来记录上一个props(` ^ ‘) if (nextProps.currentRow !==
// prevState.lastRow) {   return {     ...     lastRow: nextProps.currentRow, };
//   // 不更新state   return null }
// 为什么我们不给一个prevProps参数呢，官方解释是，一来prevProps第一次被调用的时候是null，每次更新都要判断耗性能，二来如果大家都习惯了，
// 以 后react不记录prevProps的话（啥），可以省下不少内存

// 5. 触发请求 — Invoking external callbacks
// 在生命周期中由于state的变化触发请求，在componentDidUpdate中进行 为什么不在componentWillUpdate中的理由同上2

// 6. props更新引起的副作用 — Side effects on props change
// props更改引发的可视变化（副作用,比如log,ga），在componentDidUpdate中处理 //
// 在didUpdate中根据props更新的确很不适应 // props变了也是可以触发update的
// componentDidUpdate(prevProps, prevState) { 	if (this.props.isVisible !==
// prevProps.isVisible) { 	  logVisibleChange(this.props.isVisible); 	} }
// componentWillUpdate,
// componentWillReceiveProps在一次更新中可能会被触发多次，因此这种只希望触发一次的副作用应该放在保证只触发一次的componentD
// i dUpdate中。

// 7. props更新时重新请求 — Fetching external data when props change
// 传入新的props时重新异步取数据，getDerivedStateFromProps+ componentDidUpdate 替代
// componentWillReceiveProps // old   componentWillReceiveProps(nextProps) { if
// (nextProps.id !== this.props.id) {     	this.setState({externalData: null});
// this._loadAsyncData(nextProps.id);     }   } // new   static
// getDerivedStateFromProps(nextProps, prevState) {     // Store prevId in state
// so we can compare when props change.     if (nextProps.id !==
// prevState.prevId) {       return {         externalData: null, prevId:
// nextProps.id,       };     }     // No state update necessary return null; }
// componentDidUpdate(prevProps, prevState) {     if (this.state.externalData
// === null) { this._loadAsyncData(this.props.id); }   }

// 8. 在更新前记录原来的dom节点属性 — Reading DOM properties before an update
// 在upate之前获取dom节点，getSnapshotBeforeUpdate(prevProps,
// prevState)代替componentWillUpdate(nextProps, nextState)
// getSnapshotBeforeUpdate在render之后，但在节点挂载前 componentDidUpdate(prevProps,
// prevState, snapshot)直接获得getSnapshotBeforeUpdate返回的dom属性值
// Lifecycle.defaultProps = {};

class Lifecycle extends Component {
  constructor() {
    super();
    // 推荐在此处对组件的状态进行初始化；
    this.state = {
      // 设置初始化状态
      number: 0,
      list: [
        {
          name: 'shan',
          age: '18'
        }
      ]
    }
    this.listRef = React.createRef();
    console.log('constructor');
  }
  // 定义静态属性
  static defaultProps = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    // 4. Updating state based on props
    // 7. Fetching external data when props change
    console.log('getDerivedStateFromProps');
    return null;
  }
  shouldComponentUpdate(nextProps, nextState) {
    // 是否需要更新组件； return false 就不会调用render方法 此方法中，不能调用setState()
    console.log('shouldComponentUpdate');
    return true;
  }
  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    })
  }

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        < ChildCounter n={this.state.number}/>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
  componentDidMount() {
    // 加载成功
    console.log('componentDidMount')
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list? Capture the scroll position so we can
    // adjust scroll later. if (prevProps.list.length < this.props.list.length) {
    // const list = this.listRef.current;   return list.scrollHeight -
    // list.scrollTop; }
    return null;
  }
  componentDidUpdate() {
    // 组件更新完成
    console.log('componentDidUpdate');
  }
  componentWillUnmount() {
    // 将要卸载
    console.log('componentWillUnmount')
  }
}

class ChildCounter extends Component {
  constructor() {
    super();
    //
    console.log('child-constructor');
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // 4. Updating state based on props
    // 7. Fetching external data when props change
    console.log('0child-getDerivedStateFromProps');
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 是否需要更新组件； return false 就不会调用render方法 此方法中，不能调用setState()
    return false;
  }
  render() {
    console.log('2child-render');
    return (
      <div>
        {/* {this.props.n} */}
      </div>
    )
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 8. Reading DOM properties before an update
    console.log('3child-getSnapshotBeforeUpdate');
  }
  componentDidMount() {
    console.log('4child-componentDidMount');
  }
  componentDidUpdate() {
    // 组件更新完成
    console.log('5child-componentDidUpdate');
  }
  componentWillUnmount() {
    console.log('6child-componentWillUnmount');
  }
}
export default Lifecycle;
