import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../store/actions/cart';

class CartList extends Component {
  handleChange = (id) => {
    this.props.changeCheck(id);
  }
  handleDelete = (id) => {
    this.props.removeCart(id);
  }
  render() {
    return (
      <table className='table table-border'>
        <thead>
          <tr>
            <th>是否选中</th>
            <th>商品名称</th>
            <th>商品数量</th>
            <th>商品价格</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {this.props.carts.map((item, index) => (
            <tr key={index}>
              <td><input
                type='checkbox'
                onChange={()=>{
                  this.handleChange(item.id)
                }}
                checked={item.checked}
              /></td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>{item.price}</td>
              <td><button onClick={()=>{
                this.handleDelete(item.id)
              }}
              >删除</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default connect((state) => ({
  carts: state.cart
}), actions)(CartList);