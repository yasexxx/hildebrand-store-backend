const upload = require('./../middlewares/upload');
const db = require("./../models");
const File = db.file;



exports.fileUpload =  async (req, res) => {


    try {
        await upload(req, res);
    
        const selectedFile = req.file;
        if (selectedFile !== undefined && parseData !==undefined){
            console.log(parseData.productName);
            const file = new File ( {
                filename: selectedFile.originalname,
                mimetype: selectedFile.mimetype,
                size: selectedFile.size,
                data: selectedFile.buffer
            })
    
            File.save(file).then( data => {
                        res.status(202).send(data);
                    }).catch( err => {
                        res.status(500).send( {
                            message: err.message || "Error occured while uploading file",
                            success: false
                        });
                    });
        }

        
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error when trying to upload file: ${error}`,
    success: false});   
    }
}



exports.findImage = (req,res) => {
    Champion.findOne({ "name": req.param.image },function(err,champ) {
       res.set("Content-Type", champ.contentType);
       res.send( champ.img );

       if( err) {
           console.log("Can't find image: ",err);
       }
    });
}



exports.findAll = (req, res) => {
    
    const productName = req.query.productName;
    var listProduct = productName ? { productName: { $regex: new RegExp(productName), $options: "i" } }: {};
    
    File.find(listProduct) 
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving product."
            });
        });
};



exports.findOne = (req, res) => {
    const id = req.params.id;

    File.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send( { message: `Not found product with ID ${id} `});
        else res.send(data);
    })
    .catch( err => {
        res.status(500)
        .send( {message: `Error retrieving Product with id=${id}`});
    });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send( {
            message: 'Product to update cannot be empty!'
        });
    }

    const id = req.params.id;

    File.findOneAndUpdate( id, req.body, { useFindAndModify: false})
    .then(data => {
        if(!data) {
            res.status(404).send( {
                message: ` Cannot update Product with id=${id}. Check if product exist!`
            });
        } else res.send( { message: "Product was updated successfully!"});
    })
    .catch( err => {
        res.status(500).send( {
            message: `Error updating Product with id=${id}`
        });
    });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    File.findOneAndRemove(id)
    .then( data => {
        if (!data) {
            res.status(404).send( {
                message: `Cannot delete Product with id=${id}`
            });
        } else {
            res.send({
                message: 'Product was deleted successfully!'
            });
        }
    })
    .catch( err => {
        res.status(500).send( {
            message: 
            err.message || `Could not delete Product with id=${id}`
        });
    });
};



exports.deleteAll = (req, res) => {
    File.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Products were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    });
};



exports.findAllPublished = (req, res) => {
    File.find({ isPublished: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });

};
