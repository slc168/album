"use strict";

const express=require("express");
const router=require("./router");
const path=require('path');
const config=require("./config");
const bodyParser=require("body-parser");
//获得一个app实例
const app=express();

//一般，对于一个规范的项目来说，模板文件就放在views目录下,注意：第一个参数不能改变，否则设置无效
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

// 设置静态资源处理中间件，注意，第一个参数表示虚拟路径，第二个参数表示要设置哪个目录默认作为静态资源存储位置
app.use('/www',express.static("www"));
app.use(express.static('root'));

// 配置解析post请求体的中间件，该中间件叫 body-parser ，可以在npm上搜索到，需要安装 npm install body-parser
// 当它解析完毕之后，就可以直接通过req.body 获取post请求体中的参数
app.use(bodyParser.urlencoded({extended:false}));

// 给app.locals挂载一个属性，config,方便我们在后面的处理中直接通过 req.locals.config来使用
app.use(function(req,res,next){
    app.locals.rootDir=config.rootDir;
    next();
});
// 挂载路由中间件
app.use(router);

// 挂载错误处理中间件, 一般把这个错误处理中间件，放在中间件最后的位置，这个叫做全局错误处理中间件

if(config.debug){
 app.use(function(err,req,res,next){
     res.send(`糟了，出错了：${err.message}`);
 })
}
//我在hotfix分支上
app.listen(3000,"127.0.0.1",function(){
    console.log('server is ok');
});

