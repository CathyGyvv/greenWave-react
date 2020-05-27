/** do not modify this file, genaratered by api-annotation **/
'use strict';

/*
function process(fn, type, wrap, config) {
  if (type === 'public') {
    return fn;
  }
  if (wrap) {
    return function (req, callback) {
      fn(req, callback);
    };
  } else {
    return function (req, res, next) {
      fn(req, res, next);
    };
  }
}
*/
function defaultProcess(fn, type, wraped) {
  return fn;
}
const ctrls = {
  './controller/test_ctrl.js': require('./controller/test_ctrl.js')
};
var config = {};

module.exports = function (router, process) {
  if (!process) {
    process = defaultProcess;
  }
  router.get('/api/hello_text', process(ctrls['./controller/test_ctrl.js'].helloText, 'public', true), true);
  router.get('/api/hello_origin', process(ctrls['./controller/test_ctrl.js'].helloOrigin, 'public', false), false);
  router.get('/api/hello_gen', process(ctrls['./controller/test_ctrl.js'].helloGen, 'public', true), true);
  router.get('/', process(ctrls['./controller/test_ctrl.js'].welcomeTpl, 'public', true), true);
};
