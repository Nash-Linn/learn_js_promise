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
