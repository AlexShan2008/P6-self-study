class Element {
  constructor(type, props) {
    this.type = type;
    this.props = props;
  }
}

let React = {
  createElement(type, props, ...children) {
    // children 可能是数组或者是字符串（1个元素）
    if (children.length === 1) {
      // 只有1个子元素
      children = children[0];
    }
    return new Element(type, { ...props, children })
  }
}
let ele = React.createElement(
  'h1',
  { className: 'red' },
  React.createElement(
    'span',
    null,
    'zfpx'
  ),
  'Hello world!',
  'beijing'
);

function render(eleObj, container) {
  let { type, props } = eleObj;
  let ele = document.createElement(type);
  for (let key in props) {
    if (key !== children) {
      if (key === 'className') {
        ele.setAttribute('class', props[key]);
      } else {
        ele.setAttribute(key, props[key]);
      }
    } else {
      // 是儿子节点
      if (Array.isArray(children)) {
        children.forEach(child => {
          if (child instanceof Element) {
            render(child, ele);
          } else {
            // 文本节点
            ele.appendChild(document.createTextNode(child));
          }
        });
      } else {
        if (child instanceof Element) {
          render(child, ele);
        } else {
          // 文本节点
          ele.appendChild(document.createTextNode(child));
        }
      }
    }
  }

  container.appendChild(ele);
}

render(ele, window.root);

console.log(React.createElement(
  'h1',
  { className: 'red' },
  React.createElement(
    'span',
    null,
    'zfpx'
  ),
  'Hello world!',
  'beijing'
));