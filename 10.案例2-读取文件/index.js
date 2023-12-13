// 1.导入模块
const fs = require("fs");
const util = require("util");

// 2.调用方法
const myreadFile = util.promisify(fs.readFile);

// 3.读取文件
let one = myreadFile("./1.txt");
let two = myreadFile("./2.txt");
let three = myreadFile("./3.txt");
// 4.处理结果
let result = Promise.all([one, two, three]);
result.then(
  (res) => {
    console.log(String(res));
  },
  (rea) => {
    console.log("rea", rea);
  }
);
