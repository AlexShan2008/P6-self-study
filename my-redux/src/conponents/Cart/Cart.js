import React, { Component } from 'react';
import CartList from '../CartList/CartList';
import CartTail from '../CartTail/CartTail';


class Cart extends Component {
  render() {
    return (
      <div className='container'>
      <h3 className='text-center'>Cart</h3>
        <CartList/>
        <CartTail/>
      </div>
    );
  }
}

export default Cart;