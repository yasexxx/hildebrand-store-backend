
var router = require("express").Router();

module.exports = app => {


const upload  = require("./../controllers/upload.controller");


    router.post("/file", upload.fileUpload );

    router.get("/", upload.findAll);
 

    router.get("/published", upload.findAllPublished);
  

    router.get("/:id", upload.findOne);
  

    router.put("/:id", upload.update);
  

    router.delete("/:id", upload.delete);
  

    router.delete("/", upload.deleteAll);



    app.use('/api/v1/en-PH/upload', router);
}