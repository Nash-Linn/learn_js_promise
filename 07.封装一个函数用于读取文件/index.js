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
