// todo reducer
import * as types from '../action-types';

// 自定义
let initState = {
    todos: ['swimming', 'reading']
};

function todo(state = initState, action) {
    // {type: ADD_TODO, todo: ['swimming','reading']}
    switch (action.type) {
        case types.ADD_TODO:
            return {
                todos: [
                    ...state.todos,
                    action.todo
                ]
            }
            break;

        default:
            break;
    }
    return state;
}

export default todo;
