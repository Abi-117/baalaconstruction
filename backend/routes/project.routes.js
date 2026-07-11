const express=require("express");
const router=express.Router();

const upload=require("../middleware/upload.middleware");

const {
createProject,
getProjects,
getProjectById,
deleteProject,
updateProject
}=require("../controllers/project.controller");


router.post(
"/",
upload.array("images",10),
createProject
);


router.get(
"/",
getProjects
);


router.get(
"/:id",
getProjectById
);


router.delete(
"/:id",
deleteProject
);


router.put(
"/:id",
upload.array("images",10),
updateProject
);


module.exports=router;