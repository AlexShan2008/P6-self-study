export let noop = () => { };
export let onload = (cb) => {

  if (document.readyState === 'complete') {
    cb();
    return void 0;
  }
  window.addEventListener('load', cb);
};

export default {
  noop,
  onload
};