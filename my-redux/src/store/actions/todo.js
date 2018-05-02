// todo actions
import * as types from '../action-types';

// 自定义
let actions = {
    addTodo(todo) {
        return {type: types.ADD_TODO, todo}
    }
}

export default actions;
