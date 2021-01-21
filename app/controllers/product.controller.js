const upload = require('./../middlewares/upload');
const db = require("./../models");
const Product = db.product;
const imgCompressor = require('./../utilities/img-compressor').compressImageJpeg;

const IMG_FORMAT = 'jpeg png';

exports.fileUpload =  async (req, res) => {
    try {
        await upload(req, res);
        let selectedFile = req.file;
        const originalName = (selectedFile.originalname).split('.')[0];
        const imgFormat = selectedFile.mimetype.split('/')[1];
        const isFound = IMG_FORMAT.search(imgFormat);
        const buffer = imgCompressor(selectedFile.buffer, process.env.COMPRESSION_QUALITY);
        buffer.then(
            imgData => {
            const len = imgData.length;
            const parseData = JSON.parse(JSON.stringify(req.body));
            if (selectedFile !== undefined && parseData !==undefined){
            const file = new Product ( {
                productName: parseData.productName,
                description: parseData.description,
                category: parseData.category,
                price: parseInt(parseData.price),
                availableProduct: parseInt(parseData.availableProduct),
                isPublished: parseData.isPublished ==="true",
                imageFile: {
                    fileName: isFound !== -1 ? selectedFile.originalname : `${originalName}.jpg`,
                    data: imgData,
                    mimetype: isFound !== -1 ? selectedFile.mimetype : 'image/jpeg',
                    size: len
                },
                post: {
                    topProduct: parseData.topProduct,
                    featuredProduct: parseData.featuredProduct,
                    latestProduct: parseData.latestProduct,
                    restaurantProduct: parseData.restaurantProduct,
                    supermarketProduct: parseData.supermarketProduct,
                    other: parseData.other
                        },
                options: {
                restaurantFood: parseData.restaurantFood,
                restaurantDrink: parseData.restaurantDrink,
                restaurantDessert: parseData.restaurantDessert,
                supermarketGrocery: parseData.supermarketGrocery,
                supermarketVegetable: parseData.supermarketVegetable,
                supermarketCannedGoods: parseData.supermarketCannedGoods
            }
            
            });
    
    Product.countDocuments({ productName: parseData.productName} && { imageFile: {size: selectedFile.size}}, function (err, count) {
                if (err || count > 0){
                    res.status(500).send( {message: err || "The file is already exists, try to use the existing file!",
                success: false} )
                } else if (!err && count === 0) {
                    file
                    .save(file).then( data => {
                        res.status(200).send({message: `The product was successfully created with name: ${data.productName}`,
                    success: true });
                    }).catch( err => {
                        res.status(500).send( {
                            message: err.message || "Error occured while creating Product.",
                            success: false
                        });
                    });
                }
            }); 
        }
            }
        ).catch(
            err => {console.log(err);}
        );
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error when trying upload images: ${error}`, success: false});
        res.header()   
    }
}




exports.findAll = (req, res) => {
    const productName = req.query.productName;
    var listProduct = productName ? { productName: { $regex: new RegExp(productName), $options: "i" } }: {};
    
    Product.find(listProduct) 
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).write({
                message:
                    err.message || "Some error occurred while retrieving product.",
                    success: false
            });
        });
};



exports.findOne = (req, res) => {
    try {
        const id = req.params.id;

    Product.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send( { message: `Not found product with id: ${id} `, success: false});
        else res.status(202).send(data);
    })
    .catch( err => {
        res.status(500)
        .send( {message: `Error retrieving Product with id=${id}`, success: false});
    });
    } catch (error) {
        console.log(error);
    }
};



exports.update =  async (req, res) => {
    try {
        await upload(req, res);
        const id = req.params.id;
        const selectedFile = req.file;
        const imgFormat = selectedFile.mimetype.split('/')[1];
        const isFound = IMG_FORMAT.search(imgFormat);
        const buff = imgCompressor(selectedFile.buffer, process.env.COMPRESSION_QUALITY);
        buff.then(
            buffer => {
                const len = buffer.length;
                const parseData = JSON.parse(JSON.stringify(req.body));
        const newObjNoFile = {
            productName: parseData.productName,
            description: parseData.description,
            category: parseData.category,
            price: parseInt(parseData.price),
            availableProduct: parseInt(parseData.availableProduct),
            isPublished: parseData.isPublished,
            post: {
                topProduct: parseData.topProduct,
                featuredProduct: parseData.featuredProduct,
                latestProduct: parseData.latestProduct,
                restaurantProduct: parseData.restaurantProduct,
                supermarketProduct: parseData.supermarketProduct,
                other: parseData.other
                    },
            options: {
                restaurantFood: parseData.restaurantFood,
                restaurantDrink: parseData.restaurantDrink,
                restaurantDessert: parseData.restaurantDessert,
                supermarketGrocery: parseData.supermarketGrocery,
                supermarketVegetable: parseData.supermarketVegetable,
                supermarketCannedGoods: parseData.supermarketCannedGoods
            }
        }

        if (selectedFile !== undefined && parseData !==undefined){
            const imageFile =  {
                imageFile: {
                fileName: isFound !== -1 ? selectedFile.originalname : `${originalName}.jpg`,
                data: buffer,
                mimetype: isFound !== -1 ? selectedFile.mimetype : 'image/jpeg',
                size: len
                }
                }

        if(!req.body) {
                return res.status(400).send( {
                    message: 'Product to update cannot be empty or invalid form!',
                    success: false
                });
            }
         
        const newObjWithFile = { ...newObjNoFile , ...imageFile };
        updater(id, newObjWithFile);
        
        }
    else {
        updater(id, newObjNoFile);

    }
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    } 
    catch (error) {
        console.log(error);
        res.status(500).send( { messsage: `Error when trying upload image || ${error}`,
        success: false } );
    }

        // FUNCTION
    function updater (id, data) {
        Product.findByIdAndUpdate( id, data, { useFindAndModify: false} , function( err, doc, res) {
        if(err) { console.log(err);} })
    .then(data => {
        if(!data) {
            res.status(404).send( {
                message: ` Cannot update Product with id=${id}. Check if product exist!`,
                success: false
            });
        }
        res.status(200).send( { message: `The product ${data.productName} was successfully updated!`,
                success: true});
    })
    .catch( err => {
        res.status(500).send( {
            message: `Error updating Product with id: ${id}`,
            success: false
        });
    });
    }
};


exports.delete = (req, res) => {
    try {
        const id = req.params.id;

    Product.findByIdAndRemove(id)
    .then( data => {
        if (!data) {
            res.status(404).send( {
                message: `Cannot delete Product with id=${id}`,
                success: false
            });
        } else {
            res.status(200).send({
                message: 'Product was deleted successfully!', data: data,
                success: false
            });
        }
    })
    .catch( err => {
        res.status(500).send( {
            message: 
            err.message || `Could not delete Product with id=${id}`,
            success: false
        });
    });
    } catch (error) {
        console.log(error);
    }
};



exports.deleteAll = (req, res) => {
    try {
        Product.deleteMany({})
        .then(data => {
            if(data.deletedCount === 0 ){
            res.status(200).send(     
                {message: `No product deleted, got empty list`,
                success: true}
            )    
            } 
            res.status(200).send(
                {message: `${data.deletedCount} Products were deleted successfully!`,
                    success: true }

        )})
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all products.",
                success: false
        });
        });
    } catch (error) {
        console.log(error);
    }
};



exports.findAllPublished = (req, res) => {
    Product.find({ isPublished: true })
    .then(data => {
      res.status(202).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
          success: false
      });
    });

};


exports.findTopProduct = (req, res) => {
    Product.find( {'post.topProduct': true })
    .then( data => {
        res.status(202).send(data);
    })
    .catch( err => {
        console.log(err);
        res.status(500).send({
            message: 
            "Some error occured while retrieving top products.",
            success: false
        })
    })
}


exports.topProductCount = async (req, res) => {
    let container = []
    await Product.find( {'post.topProduct': true })
    .then( data => {
        const dataLen = data.length;
        const obj = {title: 'Top Product', length: dataLen}
        container.push(obj);
    })
    .catch( err => {
        console.log(err);
        const obj = {
            title: 'error:topProduct',
            message: 
            "Some error occured while retrieving top products.",
            success: false
        };
        container.push(obj);
    });
    await Product.find( {'post.featuredProduct': true })
    .then( data => {
        const dataLen = data.length;
        const obj = {title: 'Featured Product', length: dataLen}
        container.push(obj);
    })
    .catch( err => {
        console.log(err);
        const obj = {
            title: 'error:featuredProduct',
            message: 
            "Some error occured while retrieving top products.",
            success: false
        }
        container.push(obj);
    });
    await Product.find( {'post.latestProduct': true })
    .then( data => {
        const dataLen = data.length;
        const obj = {title: 'Latest Product', length: dataLen}
        container.push(obj);
    })
    .catch( err => {
        console.log(err);
        const obj = {
            title: 'error:featuredProduct',
            message: 
            "Some error occured while retrieving top products.",
            success: false
        };
        container.push(obj);
    });

    res.status(202).send(container);
}

exports.findLatestProduct = (req, res) => {
    Product.find( { 'post.latestProduct': true })
    .then( data => {
        res.status(202).send(data);
    })
    .catch( err => {
        res.status(500).send({
            message: 
            "Some error occured while retrieving latest products.",
            success: false
        })
    })
}


exports.findFeaturedProduct = (req, res) => {
    Product.find( {'post.featuredProduct': true })
    .then( data => {
        res.status(202).send(data);
    })
    .catch( err => {
        res.status(500).send({
            message: 
            "Some error occured while retrieving featured products.",
            success: false
        })
    })
}

exports.findRestaurantProduct = (req, res) => {
    Product.find( {'post.restaurantProduct': true })
    .then( data => {
        res.status(202).send(data);
    })
    .catch( err => {
        res.status(500).send({
            message: 
            "Some error occured while retrieving featured products.",
            success: false
        })
    })
}


exports.findSupermarketProduct = (req, res) => {
    Product.find( {'post.supermarketProduct': true })
    .then( data => {
        res.status(202).send(data);
    })
    .catch( err => {
        res.status(500).send({
            message: 
            "Some error occured while retrieving featured products.",
            success: false
        })
    })
}


exports.findOtherProduct = (req, res) => {
    Product.find( {'post.others': true })
    .then( data => {
        res.status(202).send(data);
    })
    .catch( err => {
        res.status(500).send({
            message: 
            "Some error occured while retrieving featured products.",
            success: false
        })
    })
}


exports.findRestaurantFood = (req, res) => {
    Product.find( {'options.restaurantFood': true })
    .then( data => {
        res.status(202).send(data);
    })
    .catch( err => {
        res.status(500).send({
            message: 
            "Some error occured while retrieving restaurant food products.",
            success: false
        })
    })
}


exports.findRestaurantDessert = (req, res) => {
    Product.find( {'options.restaurantDessert': true })
    .then( data => {
        res.status(202).send(data);
    })
    .catch( err => {
        res.status(500).send({
            message: 
            "Some error occured while retrieving restaurant dessert products.",
            success: false
        })
    })
}


exports.findRestaurantDrink = (req, res) => {
    Product.find( {'options.restaurantDrink': true })
    .then( data => {
        res.status(202).send(data);
    })
    .catch( err => {
        res.status(500).send({
            message: 
            "Some error occured while retrieving restaurant drink products.",
            success: false
        })
    })
}

exports.findSupermarketGrocery = (req, res) => {
    Product.find( {'options.supermarketGrocery': true }).where('isPublished').equals(true)
    .then( data => {
        res.status(202).send(data);
    })
    .catch( err => {
        res.status(500).send({
            message: 
            "Some error occured while retrieving supermarket grocery products.",
            success: false
        })
    })
}

exports.findSupermarketVegetable = (req, res) => {
    Product.find( {'options.supermarketVegetable': true }).where('isPublished').equals(true)
    .then( data => {
        res.status(202).send(data);
    })
    .catch( err => {
        res.status(500).send({
            message: 
            "Some error occured while retrieving supermarket vegetable products.",
            success: false
        });
    })
}

exports.findSupermarketCannedGoods = (req, res) => {
    Product.find( {'options.supermarketCannedGoods': true }).where('isPublished').equals(true)
    .then( data => {
        res.status(202).send(data);
    })
    .catch( err => {
        res.status(500).send({
            message: 
            "Some error occured while retrieving supermarket canned goods products.",
            success: false
        })
    })
}