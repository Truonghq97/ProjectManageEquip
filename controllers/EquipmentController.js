const Equipment = require ('../models/EquipmentModel');
const jwt = require ('jsonwebtoken');

// Create and save a new equipment
exports.create = (req, res) => {
    // Validate request 
    if(!req.body.name) {
        return res.status(400).send ({
            message: "Equipment content can not be empty"
        })
    }

    // Create equipment
    const equipment = new Equipment({
        type: req.body.type,
        name: req.body.name,
        status:  req.body.status,
        description: req.body.description
    })
    // Save equipment in the database
    equipment.save()
    .then(data => {
        res.send(data);
    }).catch (err => {
        res.status(500).send({
            message: err.message
        })
    }) 
}

// Get all equipment
exports.getAll = (req, res) => {
    Equipment.find()
    .then(equipments => {
        res.send(equipments)
    }).catch (err => {
        res.status(500).send({
            message: err.message
        })
    })
}

// Find a single equipment with a equipmentId
exports.findOne = (req, res) => {

    var token = verifyToken(req, res);
    jwt.verify(token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(404);
        } else {
            Equipment.findById(req.params.equipmentId)
            .then(equipment => {
                if(!equipment) {
                    return res.status(404).send({
                        message: "Equipment not found with id " + req.params.equipmentId
                    });            
                }
                res.send(equipment);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Equipment not found with id " + req.params.equipmentId
                    });                
                }
                return res.status(500).send({
                    message: "Error retrieving equipment with id " + req.params.equipmentId
                });
            });
        }
    });

};

// Update equipment
exports.update = (req, res) => {
    // Validate request 
    if(!req.body.name) {
        return res.status(400).send ({
            message: "Equipment content can not be empty"
        })
    }

    var token = verifyToken(req, res);
    jwt.verify(token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(404);
        } else {
            // Find equipment
            Equipment.findByIdAndUpdate(req.params.equipmentId, {
                type: req.body.type,
                name: req.body.name,
                status:  req.body.status,
                description: req.body.description
            }, {new: true})
            .then( equipment => {
                if(!equipment) {
                    return res.status(400).send ({
                        message: "Equipment not found with id " + req.params.equipmentId
                    })
                } else 
                    res.send(equipment)
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return req.status(400).send ({
                        message: "Equipment not found with id " + req.params.equipmentId
                    })
                } else {
                    return req.status(500).send ({
                        message: "Error updating not with id " + req.params.equipmentId
                    })
                }
            })
        }
    });

    
} 

// Delete equipment
exports.delete = (req, res) => {
    var token = verifyToken(req, res);
    jwt.verify(token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(404);
        } else {
            Equipment.findByIdAndRemove(req.params.equipmentId)
            .then(equipment => {
                if(!equipment) {
                    return res.status(400).send ({
                        message: "Equipment not found with id " + req.params.equipmentId
                    })
                } else if (equipment && authData.user[0].role == 'admin') {
                    res.send({message: "Equipment deleted successfully"});
                } else {
                    res.send({message: "You do not have permission to delete equipment!!! "})
                }
                
            }). catch(err => {
                if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return req.status(400).send ({
                        message: "Equipment not found with id " + req.params.equipmentId
                    })
                } else {
                    return req.status(500).send ({
                        message: "could not delete not with id " + req.params.equipmentId
                    })
                }
            })
        }
    });
    
}


// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization']

    // Check if Bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ')
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        return bearerToken;
        //next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}