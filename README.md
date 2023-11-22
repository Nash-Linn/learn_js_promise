# 为什么出现Promise

解决嵌套回调（回调地狱）

```
请求1(function (结果1) {
  请求2(function (结果2) {
    请求3(function (结果3) {
      请求4(function (结果4) {
        ...
      });
    });
  });
});
```

​	

# Promise状态

pending 		等待

fulfilled 		 成功

rejected		 失败

```js
/*
      Promise 实例化对象的状态只能从 pending 到 fulfilled 或者是 pending 到 reject
      不能从 fulfilled 到 rejected 或者反之都不行
    */

const p1 = new Promise((resolve,reject)=>{
    //调整状态
    // resolve('ok')  //成功
    reject('error')  //失败
})

console.log(p1)
```

