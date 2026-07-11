const express=require("express");

const router=express.Router();

const upload=require("../middleware/upload.middleware");

const{

createGallery,

getGallery,

deleteGallery,

updateGallery

}=require("../controllers/gallery.controller");

router.get("/",getGallery);

router.post("/",upload.single("image"),createGallery);

router.put("/:id",upload.single("image"),updateGallery);

router.delete("/:id",deleteGallery);

module.exports=router;