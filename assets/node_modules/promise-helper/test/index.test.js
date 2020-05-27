var e= require('expect.js')
var helper = require('../index')

describe('promise-helper', function() {
  describe('promisify', function () {
    it('should return data if cb(null, data)', function (done) {
      function async (data, cb) {
        cb(null, data)
      }
      var input = 1
      helper.promisify(async)(input).then(function (data) {
        e(data).to.be(input)
        done()
      }).catch(done)
    })
    it('should return [a, b] if cb(null, a, b)', function (done) {
      function async (a, b, cb) {
        cb(null, a, b)
      }
      var inputA = 1
      var inputB = 2
      helper.promisify(async)(inputA, inputB).then(function (data) {
        e(data).to.be.eql([inputA, inputB])
        done()
      }).catch(done)
    })
    it('should return err if cb(err)', function (done) {
      function async (a, cb) {
        cb(mockError)
      }
      var mockError = new Error()
      helper.promisify(async)(1).catch(function (err) {
        e(err).to.be(mockError)
        done()
      }).catch(done)
    })
    it('should return data if cb(data)', function (done) {
      function async (a, cb) {
        cb(a)
      }
      helper.promisify(async, {withError: false})(1).then(function (data) {
        e(data).to.be(1)
        done()
      }).catch(done)
    })
  })
  describe('sleep', function () {
    it('should sleep timeout', function (done) {
      var timeout = 200
      var now = Date.now()
      helper.sleep(timeout).then(function () {
        e(Date.now() - now).not.to.be.lessThan(timeout)
        done()
      }).catch(done)
    })
  })
  describe('delay', function () {
    it('should delay timeout and run func', function (done) {
      function run () {
        return 1
      }
      var timeout = 200
      var now = Date.now()
      helper.delay(run, timeout).then(function (data) {
        e(Date.now() - now).not.to.be.lessThan(timeout)
        e(data).to.be(1)
        done()
      }).catch(done)
    })
    it('should return error if cancel before timeout', function (done) {
      function run () {
        return 1
      }
      var timeout = 200
      var now = Date.now()
      var promise = helper.delay(run, timeout)
      promise.catch(function (err) {
        e(err.message).to.be('delay is canceled')
        done()
      }).catch(done)
      promise.cancel()
    })
  })
  describe('interval', function () {
    it('should interval timeout and run func', function (done) {
      var arr = []
      function run () {
        return arr = arr.concat(1)
      }
      var timeout = 50
      var now = Date.now()
      var interval = helper.interval(run, timeout)
      interval.catch(function (err) {
        e(Date.now() - now).not.to.be.greaterThan(4 * timeout)
        e(err.message).to.be('interval is canceled')
        e(arr.length).to.be(3)
        done()
      }).catch(done)
      helper.sleep(170).then(function () {
        interval.cancel()
      }).catch(done)
    })
  })
  describe('retry', function () {
    it('should return value if retry success', function (done) {
      var arr = []
      var counter = 5
      function run () {
        return 1
      }
      function condtion () {
        counter--
        return counter > 0
      }
      helper.retry(run, condtion).then(function (data) {
        e(data).to.be(1)
        e(counter).to.be(4)
        done()
      }).catch(done)
    })
    it('should retry until condtion() return false', function (done) {
      var arr = []
      var counter = 5
      function run () {
        throw new Error()
      }
      function condtion () {
        counter--
        return counter > 0
      }
      helper.retry(run, condtion).catch(function (err) {
        e(err.isRetryFailed).to.be(true)
        e(counter).to.be(0)
        done()
      }).catch(done)
    })
    it('should retry until condtion() return false', function (done) {
      var arr = []
      var counter = 3
      var initTimeout = 100
      var now = Date.now()
      var expectTimeoutSum = 0
      function timeout () {
        var nextTimeout = initTimeout * (3 - counter)
        expectTimeoutSum += nextTimeout
        return nextTimeout
      }
      function run () {
        throw new Error()
      }
      function condtion () {
        counter--
        return counter > 0
      }
      helper.retry(run, condtion, timeout).catch(function (err) {
        e(err.isRetryFailed).to.be(true)
        e(counter).to.be(0)
        e(Date.now() - now).not.to.be.lessThan(expectTimeoutSum)
        done()
      }).catch(done)
    })
  })
  describe('all', function () {
    describe('customPromise.all', function () {
      before(function () {
        function CustomPromise (fn) {
          return new Promise(fn)
        }
        helper.setPromise(CustomPromise)
      })
      after(function () {
        helper.setPromise(Promise)
      })
      it('should return data if all promise done', function (done) {
        var now = Date.now()
        var counter = 0
        function test () {
          return helper.delay(function () {
            return counter++
          }, 100)
        }
        var promises = [test(), test(), test(), test()]
        helper.all(promises).then(function (data) {
          e(counter).to.be(4)
          e(data).to.be.eql([0,1,2,3])
          e(Date.now() - now).to.be.greaterThan(100)
          e(Date.now() - now).not.to.be.greaterThan(150)
          done()
        }).catch(done)
      })
      it('should return error if one of promise error', function (done) {
        var now = Date.now()
        var counter = 0
        var mockError = new Error('mock error')
        function test () {
          return helper.delay(function () {
            counter++
            if (counter <= 1) {
              throw mockError
            }
            return counter
          }, 100)
        }
        var promises = [test(), test(), test(), test()]
        helper.all(promises).catch(function (err) {
          e(err).to.be(mockError)
          e(counter).to.be(4)
          done()
        }).catch(done)
      })
    })
    describe('defaultAll', function () {
      it('should return data if all promise done', function (done) {
        var now = Date.now()
        var counter = 0
        function test () {
          return helper.delay(function () {
            return counter++
          }, 100)
        }
        var promises = [test(), test(), test(), test()]
        helper.all(promises).then(function (data) {
          e(counter).to.be(4)
          e(data).to.be.eql([0,1,2,3])
          e(Date.now() - now).to.be.greaterThan(100)
          e(Date.now() - now).not.to.be.greaterThan(150)
          done()
        }).catch(done)
      })
      it('should return error if one of promise error', function (done) {
        var now = Date.now()
        var counter = 0
        var mockError = new Error('mock error')
        function test () {
          return helper.delay(function () {
            counter++
            if (counter <= 1) {
              throw mockError
            }
            return counter
          }, 100)
        }
        var promises = [test(), test(), test(), test()]
        helper.all(promises).catch(function (err) {
          e(err).to.be(mockError)
          e(counter).to.be(4)
          done()
        }).catch(done)
      })
    })
  })
  describe('parallel', function () {
    it('should parallel all promise if concurrency >= promises.length, concurrency(default: promise.length)', function (done) {
      var now = Date.now()
      var counter = 0
      function test () {
        return helper.delay(function () {
          return counter++
        }, 100)
      }
      var promiseGens = [test, test, test, test]
      helper.parallel(promiseGens).then(function (data) {
        e(counter).to.be(4)
        e(data).to.be.eql([0,1,2,3])
        e(Date.now() - now).to.be.greaterThan(100)
        e(Date.now() - now).not.to.be.greaterThan(150)
        done()
      }).catch(done)
    })
    it('should parallel concurrency one by one if concurrency < promises.length', function (done) {
      var now = Date.now()
      var counter = 0
      function test (i) {
        return function () {
          return helper.delay(function () {
            counter++
            return i
          }, 100)
        }
      }
      var promiseGens = [test(0), test(1), test(2), test(3), test(4)]
      helper.parallel(promiseGens, 3).then(function (data) {
        e(counter).to.be(5)
        e(data).to.be.eql([0,1,2,3,4])
        e(Date.now() - now).to.be.greaterThan(200)
        e(Date.now() - now).not.to.be.greaterThan(300)
        done()
      }).catch(done)
    })
    it('should return error if one of promise error', function (done) {
      var now = Date.now()
      var counter = 0
      var mockError = new Error('mock error')
      function test () {
        return helper.delay(function () {
          counter++
          if (counter <= 1) {
            throw mockError
          }
          return counter
        }, 100)
      }
      var promiseGens = [test, test, test, test]
      helper.parallel(promiseGens, 2).catch(function (err) {
        e(err).to.be(mockError)
        e(counter).to.be(2)
        done()
      }).catch(done)
    })
  })
  describe('props', function () {
    it('should return data if all promise done', function (done) {
      var counter = 0
      var now = Date.now()
      function test () {
        return helper.delay(function () {
          return counter++
        }, 100)
      }
      var promises = {
        a: test(),
        b: test(),
        c: test(),
        d: test()
      }
      helper.props(promises).then(function (data) {
        e(counter).to.be(4)
        e(data).to.be.eql({a:0, b:1, c:2, d:3})
        e(Date.now() - now).to.be.greaterThan(100)
        e(Date.now() - now).not.to.be.greaterThan(150)
        done()
      }).catch(done)
    })
    it('should return error if one of promise error', function (done) {
      var now = Date.now()
      var counter = 0
      var mockError = new Error('mock error')
      function test () {
        return helper.delay(function () {
          counter++
          if (counter <= 1) {
            throw mockError
          }
          return counter
        }, 100)
      }
      var promises = {
        a: test(),
        b: test(),
        c: test(),
        d: test()
      }
      helper.props(promises).catch(function (err) {
        e(err).to.be.ok()
        e(counter).to.be(4)
        done()
      }).catch(done)
    })
  })
});