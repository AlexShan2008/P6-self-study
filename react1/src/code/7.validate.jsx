import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import PropTypes from 'prop-types';

// 校验，不会阻止渲染，只会提醒

class Validate extends Component {
  // 静态属性；相当于Validate.propTypes
  static propTypes = {
    name:PropTypes.string.isRequired,
    age:PropTypes.number,
    gender:PropTypes.oneOf(['male','feMale']),
    hobby:PropTypes.array,
    salary:function (props,key,com) {
      // 自定义校验 com 组件
      if(props[name] < 20000){
        // 工资小于20000
        throw new Error(`${com} error ${prps[key]} is too low`)
      }
    },
    position:PropTypes.shape({
      x:PropTypes.number,
      y:PropTypes.number
    })
  }
  constructor(props){
    super();

  }
  render() {
    let { name, age, salary,gender,hobby,position} = this.props;
    return (
      <div>
        {name},
        {age},
        {salary}
      </div>
    );
  }
}


let person = {
  name:'shan',
  age:18,
  gender:'Male',
  hobby:['sleeping'],
  salary:10000,
  position:{
    x:100,
    y:100
  }
}

render(<Validate {...person} />,
  window.root);
