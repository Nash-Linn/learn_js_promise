/*
  Promise 下的 all 方法作用主要是针对多个 Promise的异步任务的处理
  需要接受一个数组类型的参数
  返回值：Promise 对象，状态也是由数组中的每一个 Promise 对象的状态来决定的
         当所有的 Promise 对象的状态都是成功的，最终的结果就是成功的，结果值是由每一个 Promise 的结果值组成的数组
         当所有的 Promise 对象的状态但凡有一个是失败的，最终也是失败的 Promise，结果值就是失败的这个 Promise 的结果值

*/

let p1 = new Promise((resolve, reject) => {
  resolve("ok");
});

let p2 = new Promise((resolve, reject) => {
  resolve("ok");
});

let p3 = new Promise((resolve, reject) => {
  reject("error");
});

let p4 = new Promise((resolve, reject) => {
  resolve("ok");
});

Promise.all([p1, p2, p3, p4]).then(
  (results) => {
    console.log(results);
  },
  (error) => {
    console.log(error);
  }
);
