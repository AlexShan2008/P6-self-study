import React, { Component } from 'react';
import axios from 'axios';

class Comments extends Component {
  constructor(){
    super();
    this.state ={
      comments:[],
      count:0
    }
  }
  async componentDidMount(){
    // ajax axios restful API;基于promise不支持jsonp，可以用在服务端
    // 返回then 
    let { data } = await axios.get('/user.json');
    console.log(data);
    this.setState({comments});
  }
  handleClick = (count)=>{
    this.setState({count:count+count})
  }
  render() {
    return (
      <div>
        {this.state.comments.map((item,index)=>(
          <List key={index} index = {index} {...item}
          parent={this.handleClick}></List>
        ))}
      </div>
    );
  }
}

export default Comments;

class List extends Component{
  handleClick =()=>{
    this.props.parent(2);
  }
  // key 不是属性
render(){
  let {avatar,username,content} = this.props;
  return <li onClick={this.handleClick}>{avatar}</li>
  }
}