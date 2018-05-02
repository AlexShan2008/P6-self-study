# 1 组件
> 声明两种方式：1. 函数声明 无生命周期、无状态、无this指向
> 2. 类声明
> componentDidMount
> cpmponentWillUnmount
```
let school={
  name:'zf',
  age:0
}
function Build(){
  return <p>{school.name}</p>
}
render(<div>
  <Build {...school }/>
</div>)
```
## 1.1 props
> 属性由外界传递，外界不能改变属性；
> 只有状态时属于组件自己的。

## 1.2 受控组件
> 1. 父传子 通过属性
> 2. 子传父 通过父亲传递给儿子一个函数，儿子调用父亲的函数将值传递给父亲，父亲更新值，刷新视图


