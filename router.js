"use strict";
const express=require('express');

const indexController=require("./controller/index");
const albumController=require("./controller/album");
const userController=require("./controller/user");

// router 就可以用来组织路由，对每一个具体的请求分发到具体的响应函数
const router=express.Router();
router.get("/",indexController.showIndex);
router.get("/:albumName",albumController.showAlbum);

router.post("/album/:albumName",albumController.upLoadImage);
module.exports=router;