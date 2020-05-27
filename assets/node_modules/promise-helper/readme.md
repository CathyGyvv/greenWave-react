# promise-helper 

frequetly used promise-helper

# Installation

`npm install promise-helper`

## Usage

### Getting start

```javascript
var helper = require('promise-helper')
```

### api

### setPromise(Promise<Function>)

custom your Promise

#### promisify(func\<Function>, [opt: \<Object>])

make node-callback function transfer to promise

```
function async (a, cb) {
  cb(err, data)
}
helper.promisify(async)(1).then(function (data) {}, function (err) {})
```
#### all(promises\<Array>)

wait for an array of promise and cache the value in the same sequence

```
var promises = [Promise.resolve(1), Promise.resolve(2)]
helper.all(promises).then(function (data) {
  // data is [1,2]
})
```

#### props(promises\<Object>)

wait for a map of promise and cache the value in the same key

```
var promises = {
  a: Promise.resolve(1), 
  b: Promise.resolve(2)
}
helper.props(promises).then(function (data) {
  // data is {a: 1, b: 2}
})
```

### parallel(func\<function>, concurrency\<Number>)

```
var counter = 0
var test = function () {
  return helper.delay(function () {
    return counter++
  }, 100)
}
var promiseGens = [test, test, test]
helper.parallel(promiseGens, 2).then(function (data) {
  // data is [0,1,2], exec time is about 200ms(because the exec concurrency is 2)
})
```

#### sleep(timeout\<Number>)

just like setTimeout, but in promise way

```
sleep(1000).then(function () {console.log(1)})
```

#### delay(func\<Function>, timeout\<Number>)

just like setTimeout, but in promise way

```
var promise = delay(function () {console.log(1)}, 1000) 
//return cancelabel promise, you can cancel by call promise.cancel()
```

#### interval(func\<Function>, timeout\<Number>)

just like (setTimeout -> setTimeout -> setTimeout) loop, but in promise way

```
var promise = interval(function () {console.log(1)}, 1000)
//return cancelabel promise, you can cancel by call promise.cancel()
```

#### retry(func\<Function>, condition\<Function>, timeout\<Function | Number>)

retry until condtion() is true, retry time gap is timeout() or timeout

```
var counter = 5
retry(
  function () {throw new Error()},
  function () {return counter-- > 0}, 
  1000
).then
```

#### cancelabel(func)
create cancelabel promise

```
var promise = cancelabel(function (resolve, reject) {
  resolve(1)
})
promise.catch(function (err) {
  // catch the cancel error
})
promise.cancel()
```
