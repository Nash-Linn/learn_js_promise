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



# Promise的then

- then:指定用于得到成功value的成功回调和用于得到失败reason的失败的回调，并且将返回一个新的Promise实例化对象
- 成功的状态：执行then方法的第一个回调函数
- 失败的状态：执行then方法的第二个回调函数
- then 方法的返回值Promise实例化对象的状态取决于回调函数中的内容
- 如果返回为非Promise实例化对象，则得到一个是成功的Promise
- 如果返回的是Promise实例化对象，则Promise实例化对象的状态和结果值将直接影响result
- 如果为抛出异常，则新的Promise实例化对象（result）为失败的Promise

```js
const p1 = new Promise((resolve, reject) => {
    resolve("ok");
    // reject('err')
});

const result = p1.then((value)=>{
    return new Promise((resolve,reject)=>{
        // resolve(value);
        throw new Error('异常信息')
    })
},(reason)=>{
    return new Promise((resolve,reject)=>{
        reject('err')
    })
})

console.log('result',result)
```



# Promise的链式调用

```js
const p1 = new Promise((resolve,reject)=>{
    resolve('ok')
})

p1.then(val=>{
    console.log('第一步')
}).then(val=>{
    console.log('第二步')
}).then(val=>{
    console.log('第三步')
}).then(val=>{
    console.log('第四步')
}).then(val=>{
    console.log('第五步')
})
```



## 案例-使用promise的链式调用读取文件

```js
// 1.导入模块
const fs = require("fs");

// 2.创建Promise实例化对象
new Promise((resolve, reject) => {
  fs.readFile("./1.txt", (err, data) => {
    if (err) reject(err);
    resolve(data);
  });
})
  .then((val) => {
    return new Promise((resolve, reject) => {
      fs.readFile("./2.txt", (err, data) => {
        if (err) reject(err);
        resolve([val, data]);
      });
    });
  })
  .then((val) => {
    return new Promise((resolve, reject) => {
      fs.readFile("./3.txt", (err, data) => {
        if (err) reject(err);
        resolve([...val, data]);
      });
    });
  })
  .then((val) => {
    console.log(val.toString());
  });

```



## 案例-使用promise进行数据库操作 mongodb

安装 *mongoose* 模块

```
npm init -y
npm i mongoose
```



官网安装mongodb [MongoDB：应用程序数据平台 | MongoDB](https://www.mongodb.com/zh-cn)

输入命令启动 MondoDB 服务

```
mongod   --dbpath 存放数据库的地址
如
mongod   --dbpath D:\codeing\learn\learn_js_promise\mongodb
```

浏览器中输入地址和端口号为：

[http://localhost:27017](http://localhost:27017/)

显示结果如下，就说明安装成功并结束

![image-20231123111358539](README.assets/image-20231123111358539.png)



进行mongodb操作

```js
// 1.导入模块
const mongoose = require("mongoose");
// 2.创建Promise实例化对象
new Promise((resolve, reject) => {
  // 3.链接数据库
  mongoose.connect("mongodb://127.0.0.1:27017/project");
  mongoose.connection.on("open", () => {
    // 连接成功的情况
    resolve();
  });
  mongoose.connection.on("error", () => {
    // 连接失败的情况
    reject();
  });
}).then(
  (val) => {
    // 创建结构
    const noteSchema = new mongoose.Schema({
      title: String,
      content: String,
    });

    // 创建模型
    const noteModel = mongoose.model("notes", noteSchema);

    // 读取操作
    noteModel.find().then(
      (val) => {
        console.log(val);
      },
      (reason) => {
        console.log(reason);
      }
    );
  },
  (reason) => {
    console.log("链接数据库失败");
  }
);
```

## 案例-封装一个函数用于读取文件

```js
// 导入模块
const fs = require("fs");
// 封装一个函数
function ReadFileFun(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      //判断
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

// 调用

ReadFileFun("../05.Promise的链式调用-读取文件/1.txt").then(
  (val) => {
    console.log(val.toString());
  },
  (reason) => {
    console.log("reason", reason);
  }
);
```



# Promise.all()
