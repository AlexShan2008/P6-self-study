import React, { Component } from 'react';
import oldJSONP from 'jsonp';

// 百度搜索框
// 状态：就是自己的心情；
// 属性：就是别人给你的心情；

// 自己讲JSOP封装成promise方法
function jsonp(url, opts = {}) {
  return new Promise(function (resolve, reject) {
    // url 是请求路径
    // opts是请求的属性
    // 第三个参数是成功的回调
    oldJSONP(url, opts, function (err, data) {
      if (err) reject(err);//失败
      resolve(data);//成功调用
    })
  })
}

//async await
//
class Search extends Component {
  constructor() {
    super();
    this.state = {
      val: '',
      arr: [],
      index: -1
    }
  }
  componentDidMount() {

  }

  handleChange = async (e) => {
    let wd = e.target.value;
    this.wd = wd;//保存输入的内容；取不到值就用默认值；
    let url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=a';
    let result = await jsonp(url, { param: 'cb' });
    console.log(result);
    this.setState({ val: wd, arr: result })
  }

  changeIndex = (e) => {
    let index = this.state.index;//默认的索引；
    let keyCode = e.keyCode;
    if (keyCode === 38 || keyCode === 40) {
      e.preventDefault();//阻止光标跑到第一位的默认行为；
      if (keyCode === 38) {
        // 向上的箭头
        index--;
        if (index === -2) {
          index = this.state.arr.length - 1;
        }
        index < -1 ? -1 : index;
      } else {
        // 40
        index++;
        if (index === this.state.arr.length) {
          index = -1;
        }
      }
      this.setState({ index, val: this.state.arr[index] || this.wd });//更新索引，不会覆盖其它值
    }
  }
  enter = (e) => {
    // 按回车，跳到指定路径;
    if (e.keyCode === 13) {
      window.open('https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=baidu&wd=' + this.state.val);
    }

  }
  render() {
    return (
      <div>
        <input
          onChange={this.handleChange}
          onkeyDown={this.changeIndex}
          onKeyUp={this.enter}
        />
        <ul>
          {
            this.state.arr.map((item, index) => (
              <li className={(this.state.index === index ? ' active' : '') + 'list-group-item'} key={index}>{item}</li>
            ))
          }
        </ul>

      </div>
    );
  }
}

export default Search;
