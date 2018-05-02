function createStore(reducer) {
  let state;
  let listeners = [];

  let dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  let getState = () => state;

  let subScribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners.filter(fn => fn !== listener);
    }
  }

  dispatch({});

  return { dispatch, getState, subScribe }

}
// 合并reducer

function combineReducers(reducers) {
  let newState = {};
  return (state = {}, action) => {
    debugger
    // 默认返回一个新状态
    for (let key in reducers) {
      let r = reducers[key];
      let s = r(state[key], action);
      newState[key] = s;
    }
    return newState;
  }
}

export { createStore, combineReducers }