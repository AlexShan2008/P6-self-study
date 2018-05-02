// import React from 'react'; import ReactDOM from 'react-dom'; './index.css';
// import App from './App'; import registerServiceWorker from
// './registerServiceWorker'; ReactDOM.render(<App />,
// document.getElementById('root')); registerServiceWorker(); 数据源 防止篡改状态
// 先定义好干哪些事情（常量const 宏

const CHANGE_TITLE_COLOR = 'CHANGE_TITLE_COLOR';
const CHANGE_CONTENT_TEXT = 'CHANGE_CONTENT_TEXT';

let initState = {
    title: {
        color: 'red',
        text: "title"
    },
    content: {
        color: 'green',
        text: 'Content'
    }
}

// 自己定义的规则，描述如何更改状态 两个参数：根据老状态， 和新传递的动作，算出新状态 想获取默认状态，就是调用reducer，将默认值返回
// reducer是一个纯函数，属性不能更改，相同输入相同输出；每次返回一个新状态
function reducer(state = initState, action) {
    switch (action.type) {
        case CHANGE_TITLE_COLOR:
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            };
        case CHANGE_CONTENT_TEXT:
            return {
                ...state,
                content: {
                    ...state.content,
                    text: action.text
                }
            };
        default:
            return state;
    }
}

function createStore(reducer) {
    let state;
    let linsteners = [];

    let subscribe = listener => {
        linsteners.push(listener);
        return () => {
            linsteners.filter(fn => fn !== listener); //再次调用时移除监听函数
        }
    }

    let getState = () => JSON.parse(JSON.stringify(state)); //保证状态唯一

    // 派发的方法，更改状态，应该更加修改的动作进行修改
    function dispatch(action) {
        state = reducer(state, action);
        linsteners.forEach(listener => listener()); //每次调用dispatch自动订阅render方法；
    }
    dispatch({}); //{}保证reducer会走default，

    // 将方法暴露给外面；
    return {dispatch, getState, subscribe}
}

let store = createStore(reducer);
// 将定义状态和规则的抽离出来

function renderTitle() {
    let title = document.querySelector('#title');

    title.style.background = store
        .getState()
        .title
        .color;
    title.innerText = store
        .getState()
        .title
        .text;
}

function renderContent() {
    let $el = document.querySelector('#content');

    $el.style.background = store
        .getState()
        .content
        .color;
    $el.innerText = store
        .getState()
        .content
        .text;
}

function render() {
    renderTitle();
    renderContent();
}

render(); //渲染的方法
let unscribe = store.subscribe(render);

setTimeout(() => {
    unscribe();
}, 3000);

// 发布订阅模式，先将render方法订阅好， 每次dispatch都掉render方法

store.dispatch({type: CHANGE_TITLE_COLOR, color: 'blue'});
store.dispatch({type: CHANGE_CONTENT_TEXT, text: 'shanguo'});