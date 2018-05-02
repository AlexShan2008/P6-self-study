// import { combineReducers } from '../redux/redux.js';
// import counter from './reducers/counter';
// import todo from './reducers/todo';

// let reducer = combineReducers({
//   c:counter,
//   t:todo
// });

// export default reducer;

import { combineReducers } from 'redux';
import cart from './cart';

export default combineReducers({ cart });
