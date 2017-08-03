"use strict";
//当前是关于首页的一些处理逻辑
const fs=require('fs');
const path=require("path");

exports.showIndex=function(req,res,next){
    // 拿到之前通过中间件挂载的 一个根目录名称
    let rootDir=req.app.locals.rootDir;
    fs.readdir(rootDir,function(err,files){
        if(err){{
            return next(err);
        }}
        let albumNames=[];
        files.forEach(function(item){
            if(fs.statSync(path.join(rootDir,item)).isDirectory()){
                albumNames.push(item);
            }
        });
        res.render('index',{
            albumNames:albumNames
        })
    })
}