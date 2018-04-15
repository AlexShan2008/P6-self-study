// 对window.onerror 等浏览器报错的处理

// 对错误进行分类和处理；
let formatError = (errObj) => {
  let col = errObj.column || errObj.columnNumber; // Safari Firefox: code colum
  let row = errObj.line || errObj.lineNumber; // Safari Firefox: code row 
  let message = errObj.message;
  let name = errObj.name;

  // stack中的错误信息更加精准；
  let { stack } = errObj;
  if (stack) {
    // matchUrl 原报错信息；
    let matchUrl = stack.match(/https?:\/\/[^\n]+/);//+ 至少一个数字
    let urlFirstStack = matchUrl ? matchUrl[0] : '';//既有文件信息，也有行列信息 http://localhost:3003/main.js:29:3
    let regUrlCheck = /https?:\/\/(\S)*\.js/;//真正需要的数据信息；

    // 获取真正的URL，文件名称
    let resourceUrl = '';
    if (regUrlCheck.test(urlFirstStack)) {
      resourceUrl = urlFirstStack.match(regUrlCheck)[0];
    }

    // 行列信息 main.js:29:3
    let stackCol = null;
    let stackRow = null;
    let posStack = urlFirstStack.match(/:(\d+):(\d+)/);
    if (posStack && posStack.length >= 3) {
      [, stackCol, stackRow] = posStack;
    }

    // TODO: formatStack
    return {
      content: stack,
      col: Number(col || stackCol),
      row: Number(row || stackRow),
      message, name, resourceUrl
    };
  }

  return {
    row, col, message, name
  }
};

let errorCatch = {
  init: (cb) => {
    let _originOnerror = window.onerror;
    window.onerror = (...arg) => {
      let [errorMessage, scriptURI, lineNumber, columnNumber, errorObj] = arg;
      // console.log(arg, 'cuowu');
      try {
        let errorInfo = formatError(errorObj);
        errorInfo._errorMessage = errorMessage;
        errorInfo._scriptURI = scriptURI;
        errorInfo._lineNumber = lineNumber;
        errorInfo._columnNumber = columnNumber;
        errorInfo.type = 'onerror';
        cb(errorInfo);
        _originOnerror && _originOnerror.apply(window, arg);

      } catch (e) {

      }

    };

    // catch promise unhandlerejection
    let _originOnunhandledrejection = window.onunhandledrejection;
    window.onunhandledrejection = (...arg) => {
      let e = arg[0];
      let reason = e.reason;
      cb({
        type: e.type || 'unhandledrejection',
        reason
      });
      _originOnunhandledrejection && _originOnunhandledrejection.apply(window, arg);
    };
  },
};

export default errorCatch;