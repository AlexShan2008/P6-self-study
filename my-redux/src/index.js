import React, { Component } from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';

// import store from './store/index';
// import Cart from './conponents/Cart/Cart';
// import 'bootstrap/dist/css/bootstrap.min.css';

// // 用redux 开发react的流程 redux 解决评级跨组件
// // react-redux  Provider
// // connect      redux  连接redux和react 保证组件中可以自动dispatch 和 subscribe







// // 1. 先创建各个组件；跑通流程；
// // 2. 

// // context API 只能解决深度（父子，跨组件）组件中的数据传递

// render(
//   <Provider store={store}>
//     <Cart></Cart>
//   </Provider>,
//   document.getElementById('root'));


// Context 两个属性 Provider Consumer
// { color: 'blue' } 如果父类没穿就用默认的
// <Consumer>
// {({s, h}) => {
//   return <div style={s}
//     onClick={() => {
//       h('yellow')
//     }}>Title</div>
// }}
// </Consumer>

// 可以定义多个Context
// let Context = React.createContext({ color: 'blue' });
// Context.Provider
// Context.Consumer

// let { Provider, Consumer } = React.createContext({ color: 'blue' });

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       color: 'red'
//     }
//   }
//   handleClick = (newColor) => {
//     this.setState({
//       color: newColor
//     })
//   }
//   render() {
//     return (
//       <Provider value={{ s: this.state, h: this.handleClick }}>
//         <Header>
//         </Header>
//       </Provider>
//     );
//   }
// }

// class Header extends Component {
//   render() {
//     return (
//       <div>
//         <Title />
//       </div>
//     );
//   }
// }

// class Title extends Component {
//   render() {
//     return (
//       <Consumer>
//         {({ s, h }) => {
//           return <div
//             style={s}
//             onClick={() => {
//               h('yellow')
//             }}
//           >Title</div>
//         }}
//       </Consumer>
//     );
//   }
// }

// render(<App />,
//   document.getElementById('root'))



/*
* 高阶组件
* 组件返回组件
* 解决代码复用，将公共代码抽离出来
*/

// connect(state,action)(OldComponent)
// C Component
let high = (key) => (C) => {
  return class HightOrderComponent extends Component {
    constructor() {
      super();
      this.state = { val: '' }
    }
    componentWillMount() {
      let res = localStorage.getItem(key);
      this.setState({ val: res });
    }
    render() {
      return <C value={this.state.val}></C>
    }
  }
}

// function name(params) {
//   return function name(params) {

//   }
// }

// 两个输入框都需要去本地的LocalStorage取值
localStorage.setItem('username', 'shanguo');
localStorage.setItem('password', '123456');


class UserName extends Component {
  render() {
    return (
      <div>
        <input type='text' value={this.props.value} />
        UserName
      </div>
    );
  }
}
UserName = high('username')(UserName);

class Password extends Component {
  render() {
    return (
      <div>
        <input type='text' value={this.props.value} />
        Password
      </div>
    );
  }
}
Password = high('password')(Password);

class App extends Component {
  render() {
    return (
      <div>
        <UserName />
        <Password />
      </div>
    );
  }
}


render(<App />,
  document.getElementById('root'))