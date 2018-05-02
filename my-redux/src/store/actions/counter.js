import * as types from '../action-types';

// 处理counter的actionCreator

let actions = {
    add(count) {
        return {type: types.INCREMENT, count}
    },
    minus(count) {
        return {type: types.DECREMENT, count}
    }
}

export default actions;