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
