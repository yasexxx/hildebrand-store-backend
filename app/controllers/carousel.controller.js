const upload = require('./../middlewares/upload');
const db = require("./../models");
const Carousel = db.carousel;
const imgCompressor = require('./../utilities/img-compressor').compressImageJpeg;


exports.uploadCarousel =  async (req, res) => {

    try {
        await upload(req, res);
    
        const selectedFile = req.file;
        const buffer = imgCompressor(selectedFile.buffer, process.env.CAROUSEL_QUALITY);
        buffer.then(
            bufferData =>{
                const len = bufferData.length;
                const parseData = JSON.parse(JSON.stringify(req.body));
                if (selectedFile !== undefined && parseData !==undefined){
                    const file = new Carousel ( {
                        name: parseData.name,
                        mimetype: selectedFile.mimetype,
                        data: bufferData,
                        size: len,
                        miniDescription: parseData.miniDescription
                    });
            
            Carousel.countDocuments({ name: parseData.name} && { imageFile: {size: selectedFile.size}}, function (err, count) {
                        if (err || count > 0){
                            res.status(500).send( {message: err || "The file is already exists, try to use the existing file!"
                                , success: false } )
                        } else if (!err && count === 0) {
                            file
                            .save(file).then( data => {
                                res.status(200).send({message: `The carousel was successfully created with name: ${data.name}`,
                                success : true});
                            }).catch( err => {
                                res.status(500).send( {
                                    message: err.message || "Error occured while creating Carousel.",
                                    success: false
                                });
                            });
                        }
                    }); 
                }
            }
        )
    } 
    catch (error) {
        res.status(500).send( { message: `Error when trying upload images: ${error}`,
            success: false});
    }
}


exports.findAll = (req, res) => {
    const carouselName = req.query.name;
    var listCarousel = carouselName ? { name: { $regex: new RegExp(carouselName), $options: "i" } }: {};
    
    Carousel.find(listCarousel) 
        .then(data => {
            if (!data){
                res.status(400).send({message: 'Error try again!'})
            }
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving carousel."
            });
        });
};


exports.update =  async (req, res) => {
    try {
        await upload(req, res);
        const id = req.params.id;
        const selectedFile = req.file;
        const buffer = imgCompressor(selectedFile.buffer, process.env.CAROUSEL_QUALITY);
        buffer.then(
            bufferData => {
                const len = bufferData.length;
                const parseData = JSON.parse(JSON.stringify(req.body));
                const newObjNoFile = {
                    name: parseData.name,
                    miniDescription: parseData.miniDescription
                }
        
                if (selectedFile !== undefined && parseData !==undefined){
                    const imageFile =  {
                        data: bufferData,
                        mimetype: selectedFile.mimetype,
                        size: len
                        }
        
                if(!req.body) {
                        return res.status(400).send( {
                            message: 'Product to update cannot be empty or invalid form!'
                        });
                    }
                 
                const newObjWithFile = { ...newObjNoFile , ...imageFile };
                updater(id, newObjWithFile);
                
                }
            else {
                updater(id, newObjNoFile);
        
            }
            }
        );
    } 
    catch (error) {
        console.log(error);
        res.status(500).send( { messsage: `Error when trying upload image || ${error}`,
        success: false} );
    }

        // FUNCTION
    function updater (id, data) {
        try {
            Carousel.findByIdAndUpdate( id, data, { useFindAndModify: false} , function( err, doc, res) {
                if(err) { console.log(err);} })
            .then(data => {
                if(!data) {
                    res.status(404).send( {
                        message: ` Cannot update Product with id=${id}. Check if product exist!`,
                        success: false
                    });
                }
                res.send( { message: `The product ${data.name} was successfully updated!`});
            })
            .catch( err => {
                res.status(500).send( {
                    message: `Error updating Product with id: ${id}`,
                    success: false
                });
            });
        } catch (error) {
            console.log(error);
        }
    }
};

exports.findCarousel = (req, res) => {
    try {
        const id = req.params.id;
        Carousel.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send( { message: `Not found product with id: ${id} `,
                success: false});
            else res.status(200).send(data);
        })
        .catch( err => {
            res.status(500)
            .send( {message: `Error retrieving Product with id=${id}`,
            success: false});
        });
    } catch (error) {
       console.log(error); 
    }
};