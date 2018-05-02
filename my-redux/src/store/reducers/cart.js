import * as types from '../action-types';

let initState = [
  {
    id: 1,
    name: 'Mac Pro',
    price: 22888,
    count: 1,
    checked: true
  },
  {
    id: 2,
    name: 'iWatch',
    price: 999,
    count: 2,
    checked: true
  }
]

function cart(state = initState, action) {
  switch (action.type) {
    // 根据ID更改选择状态 {type:'CHANGE_CHECK', id:1}
    case types.CHANGE_CHECK:
      // 更改选中
      return state.map(cart => {
        if (cart.id === action.id) {
          cart.checked = !cart.checked
        }
        return cart;
      })
    case types.REMOVE_CART:
      // 删除商品，删除选中的商品
      return state.filter(cart => cart.id !== action.id);
  }
  return state;
}

// 购物车的管理员
export default cart;