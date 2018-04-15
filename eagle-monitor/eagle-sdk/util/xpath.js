// /html/body/div[2]/ul/li[2]
// 每当用户点击的时候生成一个xpath
// 需要对很多边界条件进行判断

let getXpath = (element) => {
  if (!(element instanceof Element)) {
    return void 0;
  }

  if (element.nodeType !== 1) {
    return void 0;
  }

  let rootElement = document.body;
  if (element === rootElement) {
    return void 0;
  }

  // 判断是第几个兄弟元素
  let childIndex = (ele) => {
    let parent = ele.parentNode;
    let children = [].slice.call(parent.childNodes).filter(_ => _.nodeType === 1);//点击的是块级元素，非文字才上报；
    // children = children.filter(node=>node.tagName === ele.tagName);//TODO: 相同标签第几个元素；
    let i = 0;
    for (let _i = 0, len = children.length; _i < len; _i++) {
      if (children[_i] === ele) {
        i = _i;
        break;
      }
    }
    return i === 0 ? '' : '[' + i + ']';
  };

  let xpath = '';

  while (element !== document) {
    let tag = element.tagName.toLocaleLowerCase();
    let eleIndex = childIndex(element);
    xpath = '/' + tag + eleIndex + xpath;
    element = element.parentNode;
  }

  return xpath;
};

export default getXpath;