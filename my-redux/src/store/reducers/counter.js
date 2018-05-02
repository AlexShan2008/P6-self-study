import * as types from '../action-types';
// 计数器的规则

let initState = {
    number: 0
};
function reducer(state = initState, action) {
    switch (action.type) {
        case types.INCREMENT:
            return {
                number: state.number + action.count
            };
        case types.DECREMENT:
            return {
                number: state.number - action.count
            };
        default:
            return state;
    }
    return state;
}

export default reducer;